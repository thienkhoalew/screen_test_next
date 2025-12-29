"use client";

import { forwardRef, useImperativeHandle } from "react";
import { MonthlyScheduleTable } from "@/components/features/schedule/MonthlyScheduleTable";
import { HeaderDateCell } from "@/app/working/[id]/components/HeaderDateCell";
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
