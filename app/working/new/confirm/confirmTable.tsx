"use client";

import { FOOTER_DATA } from "@/data/confirm";
import TableWrapper from "@/components/ui/table-wrapper";
import { MonthlyScheduleTable } from "@/components/custom/monthly-schedule-table";
import { useConfirmBoard } from "./hooks/useConfirmBoard";
import { StatusCell } from "@/components/shared/StatusCell";
import { createHeaderDateCell } from "@/components/shared/HeaderDateCellFactory";

// Create HeaderDateCell with confirm table configuration
const HeaderDateCell = createHeaderDateCell({
    startDayOfWeek: 1, // December 2025 starts on Monday
    weekdayLabel: "平日",
    weekendLabel: "休日",
    highlightWeekend: true,
    weekendColor: "text-blue-500 bg-blue-50",
    useSeparateWeekendColors: false,
});

export default function ConfirmTable() {
    const {
        drivers,
        unassignedWorks,
        handleDragEnd,
        handleStatusChange,
        handleTaskAssignment,
    } = useConfirmBoard();

    return (
        <TableWrapper title={
            <div className="flex items-center gap-3">
                <span>勤務表期間 : 2025/12/01~2025/12/31</span>
                <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded text-xs border border-green-200">有給</span>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-0.5 rounded text-xs border border-yellow-200">乗務不可日</span>
                </div>
            </div>
        }>
            <MonthlyScheduleTable
                drivers={drivers}
                unassignedWorks={unassignedWorks}
                footerData={FOOTER_DATA}
                numberOfDays={31}
                HeaderDateCell={HeaderDateCell}
                StatusCell={StatusCell}
                onDragEnd={handleDragEnd}
                onStatusChange={handleStatusChange}
                onTaskAssignment={handleTaskAssignment}
                showDragDrop={true}
                showHistoryPanel={false}
                showUnassignedWorks={true}
                showFooterRows={true}
            />
        </TableWrapper>
    );
}
