"use client";

import { FOOTER_DATA } from "@/data/confirm";
import TableWrapper from "@/components/features/schedule/TableWrapper";
import { MonthlyScheduleTable } from "@/components/features/schedule/MonthlyScheduleTable";
import { useConfirmBoard } from "./hooks/useConfirmBoard";
import { StatusCell } from "@/components/shared/table";
import { createHeaderDateCell } from "@/components/shared/table";
import VehicleConfirmTable from "./vehicleConfirmTable";

const HeaderDateCell = createHeaderDateCell({
    startDayOfWeek: 1,
    weekdayLabel: "平日",
    weekendLabel: "休日",
    highlightWeekend: true,
    weekendColor: "text-blue-500 bg-blue-50",
    useSeparateWeekendColors: false,
});

const DriverConfirmTable = () => {
    const {
        drivers,
        unassignedWorks,
        handleDragEnd,
        handleStatusChange,
        handleTaskAssignment,
    } = useConfirmBoard();

    return (
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
    );
};

export default function ConfirmTable() {
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
            {(viewMode) => viewMode === "work-schedule" ? <DriverConfirmTable /> : <VehicleConfirmTable />}
        </TableWrapper>
    );
}
