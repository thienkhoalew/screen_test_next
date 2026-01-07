"use client";

import { forwardRef, useImperativeHandle, useMemo } from "react";
import { MonthlyScheduleTable } from "@/components/features/schedule/MonthlyScheduleTable";
import { createHeaderDateCell } from "@/components/shared/table";
import { StatusCell } from "@/components/shared/table";
import { HistoryPanel } from "@/app/working/[id]/components/HistoryPanel";
import { AssistantTaskAlert } from "@/app/working/[id]/components/AssistantTaskAlert";
import { useScheduleBoard } from "@/app/working/[id]/hooks/useScheduleBoard";
import { Driver, DailyStatus } from "@/types";

export interface DetailsTableRef {
    getScheduleData: () => {
        drivers: Driver[];
        unassignedWorks: Record<number, DailyStatus[]>;
    };
}

const DetailsTable = forwardRef<DetailsTableRef>((props, ref) => {
    const {
        drivers,
        unassignedWorks,
        historyLogs,
        handleDragEnd,
        handleStatusChange,
        handleTaskAssignment,
        handleReset
    } = useScheduleBoard();

    useImperativeHandle(ref, () => ({
        getScheduleData: () => ({
            drivers,
            unassignedWorks
        })
    }));

    const HeaderDateCell = useMemo(
        () => createHeaderDateCell({
            startDayOfWeek: 1,
            saturdayLabel: "学休",
            sundayLabel: "学休",
            weekdayLabel: "平日",
            highlightWeekend: true,
            saturdayColor: "text-blue-500",
            sundayColor: "text-[#FB2C36] bg-[#FDF2F8]",
            useSeparateWeekendColors: true,
            workingId: "1",
        }),
        []
    );

    return (
        <MonthlyScheduleTable
            drivers={drivers}
            unassignedWorks={unassignedWorks}
            historyLogs={historyLogs}
            numberOfDays={31}
            onDragEnd={handleDragEnd}
            onStatusChange={handleStatusChange}
            onTaskAssignment={handleTaskAssignment}
            onReset={handleReset}
            HeaderDateCell={HeaderDateCell}
            StatusCell={StatusCell}
            HistoryPanel={HistoryPanel}
            showContextMenu={true}
            showPopover={true}
            AssistantTaskAlert={AssistantTaskAlert}
        />
    );
});

DetailsTable.displayName = "DetailsTable";

export default DetailsTable;
