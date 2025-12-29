"use client";

import { useRef } from "react";
import Header from "./header";
import HourlyScheduleTable, { HourlyScheduleTableRef } from "./hourly-schedule-table";
import DriverListSection from "./driver-list-section";
import FooterActions from "./footer-actions";
import { useAssignScheduleBoard } from "./hooks/useAssignScheduleBoard";

export default function AssignPage() {
    const {
        historyLogs,
        handleReset,
        addHistory
    } = useAssignScheduleBoard();

    const scheduleTableRef = useRef<HourlyScheduleTableRef>(null);

    const handleTimeSlotChange = (
        slot: any,
        oldStartTime: string,
        newStartTime: string,
        newEndTime: string
    ) => {
        addHistory(
            `${slot.taskId} (${slot.driverName}) の時間を ${oldStartTime} から ${newStartTime} に変更しました`
        );
    };

    const logScheduleData = (actionName: string) => {
        if (scheduleTableRef.current) {
            const scheduleData = scheduleTableRef.current.getScheduleData();

            console.log(`=== ${actionName} - Schedule Data ===`);
            console.log("Time Slots:", scheduleData.timeSlots);

            scheduleData.timeSlots.forEach((slot, index) => {
                console.log(`\nSlot ${index + 1}:`, {
                    taskId: slot.taskId,
                    driverName: slot.driverName,
                    groupName: slot.groupName,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    status: slot.status
                });
            });

            console.log("\n=== End Schedule Data ===");
        }
    };

    const handleSave = () => logScheduleData("保存");
    const handleConfirm = () => logScheduleData("計画確定");
    const handleClose = () => logScheduleData("実績投入後締め");

    return (
        <div className="h-screen flex flex-col bg-[#FEF9F3] overflow-hidden">
            <div className="shrink-0">
                <Header />
            </div>

            <main className="flex-1 flex flex-col gap-2 min-h-0 px-4">
                <div className="flex-[6] min-h-0">
                    <HourlyScheduleTable
                        ref={scheduleTableRef}
                        className="h-full"
                        onTimeSlotChange={handleTimeSlotChange}
                    />
                </div>

                <div className="flex-[4] min-h-0">
                    <DriverListSection
                        className="h-full"
                        historyLogs={historyLogs}
                        onReset={handleReset}
                    />
                </div>

                <div className="shrink-0 pb-1">
                    <FooterActions
                        onSave={handleSave}
                        onConfirm={handleConfirm}
                        onClose={handleClose}
                    />
                </div>
            </main>
        </div>
    );
}
