"use client";

import { MonthlyScheduleTable } from "@/components/custom/monthly-schedule-table";
import { HeaderDateCell } from "@/app/working/[id]/components/HeaderDateCell";
import { StatusCell } from "@/components/shared/StatusCell";
import { HistoryPanel } from "@/app/working/[id]/components/HistoryPanel";
import { AssistantTaskAlert } from "@/app/working/[id]/components/AssistantTaskAlert";
import { useScheduleBoard } from "@/app/working/[id]/hooks/useScheduleBoard";

export default function DetailsTable() {
    const {
        drivers,
        unassignedWorks,
        historyLogs,
        handleDragEnd,
        handleStatusChange,
        handleTaskAssignment,
        handleReset
    } = useScheduleBoard();

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
}
