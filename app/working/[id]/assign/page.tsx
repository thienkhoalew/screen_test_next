"use client";

import { useRef, useState, useMemo } from "react";
import Header from "./header";
import HourlyScheduleTable, { HourlyScheduleTableRef } from "./hourly-schedule-table";
import DriverListSection from "./driver-list-section";
import FooterActions from "./footer-actions";
import DriverEditModal from "./driver-edit-modal";
import { useAssignScheduleBoard } from "./hooks/useAssignScheduleBoard";
import { DriverInfo } from "./driver-card";
import { mockDrivers, mockDailyTasks, mockVehicles, Driver, DailyTask, Vehicle } from "./mockData";

interface DriverCategory {
    title: string;
    headerColor: string;
    drivers: DriverInfo[];
}

function categorizeDrivers(drivers: Driver[], tasks: DailyTask[]): DriverCategory[] {
    const assignedDriverIds = new Set(
        tasks.filter(t => t.driverId).map(t => t.driverId)
    );

    const toDriverInfo = (d: Driver): DriverInfo => ({
        name: d.name,
        attendanceStatus: assignedDriverIds.has(d.id) ? "割付済み" : d.attendanceStatus,
        tomorrowMovementTime: d.tomorrowMovementTime,
        nextDayHandleTime: d.nextDayHandleTime,
        holidayTime: d.holidayTime,
        holidayNextDayHandleTime: d.holidayNextDayHandleTime,
        location: d.location,
    });

    return [
        {
            title: "予備",
            headerColor: "bg-[#FEF9C2]",
            drivers: drivers
                .filter(d => !assignedDriverIds.has(d.id) && d.attendanceStatus === "予備")
                .map(toDriverInfo),
        },
        {
            title: "助勤・外部応援",
            headerColor: "bg-[#E5DDD0]",
            drivers: drivers
                .filter(d => !assignedDriverIds.has(d.id) && d.attendanceStatus === "助勤・外部応援")
                .map(toDriverInfo),
        },
        {
            title: "公休",
            headerColor: "bg-[#D4E7F7]",
            drivers: drivers
                .filter(d => !assignedDriverIds.has(d.id) && d.attendanceStatus === "公休")
                .map(toDriverInfo),
        },
        {
            title: "有給",
            headerColor: "bg-[#F3E8FE]",
            drivers: drivers
                .filter(d => !assignedDriverIds.has(d.id) && d.attendanceStatus === "有休")
                .map(toDriverInfo),
        },
        {
            title: "乗務不可",
            headerColor: "bg-[#FEE1E1]",
            drivers: drivers
                .filter(d => !assignedDriverIds.has(d.id) && d.attendanceStatus === "乗務不可")
                .map(toDriverInfo),
        },
        {
            title: "割付済み",
            headerColor: "bg-[#D4D5D8]",
            drivers: drivers
                .filter(d => assignedDriverIds.has(d.id))
                .map(toDriverInfo),
        },
    ];
}

export default function AssignPage() {
    const {
        historyLogs,
        handleReset,
        addHistory
    } = useAssignScheduleBoard();

    const scheduleTableRef = useRef<HourlyScheduleTableRef>(null);

    const [tasks, setTasks] = useState<DailyTask[]>(mockDailyTasks);
    const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
    const [vehicles] = useState<Vehicle[]>(mockVehicles);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<DailyTask | null>(null);

    const driverCategories = useMemo(() => {
        return categorizeDrivers(drivers, tasks);
    }, [drivers, tasks]);

    const getDriverById = (driverId?: string): Driver | undefined => {
        if (!driverId) return undefined;
        return drivers.find(d => d.id === driverId);
    };

    const getVehicleById = (vehicleId?: string): Vehicle | undefined => {
        if (!vehicleId) return undefined;
        return vehicles.find(v => v.id === vehicleId);
    };


    const handleDriverClick = (task: DailyTask) => {
        setSelectedTask(task);
        setIsModalOpen(true);

        const currentDriver = getDriverById(task.driverId);
        if (currentDriver) {
            addHistory(`${task.taskId} の運転手割付変更を開始: 現在 ${currentDriver.name}`);
        } else {
            addHistory(`${task.taskId} に運転手を割り当てます`);
        }
    };

    const handleAssignDriver = (selectedDriver: DriverInfo | null) => {
        if (!selectedDriver || !selectedTask) {
            setIsModalOpen(false);
            return;
        }

        const driver = drivers.find(d => d.name === selectedDriver.name);
        if (!driver) {
            console.error("Driver not found:", selectedDriver.name);
            setIsModalOpen(false);
            return;
        }

        const previousDriver = getDriverById(selectedTask.driverId);

        setTasks(prev => prev.map(t =>
            t.id === selectedTask.id
                ? { ...t, driverId: driver.id, status: "assigned" as const }
                : t
        ));

        if (previousDriver) {
            addHistory(`${selectedTask.taskId}: ${previousDriver.name} → ${driver.name} に変更しました`);
        } else {
            addHistory(`${selectedTask.taskId} に ${driver.name} を割り当てました`);
        }

        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const handleTimeSlotChange = (
        task: DailyTask,
        oldStartTime: string,
        newStartTime: string,
        newEndTime: string
    ) => {
        const driver = getDriverById(task.driverId);
        const driverName = driver?.name || "未指定";

        addHistory(
            `${task.taskId} (${driverName}) の時間を ${oldStartTime} から ${newStartTime} に変更しました`
        );

        setTasks(prev => prev.map(t =>
            t.id === task.id ? task : t
        ));
    };

    const handlePageReset = () => {
        handleReset();
        setTasks(mockDailyTasks);
        setDrivers(mockDrivers);
    };

    const logScheduleData = (actionName: string) => {
        console.log(`=== ${actionName} - Schedule Data ===`);
        console.log("Tasks:", tasks);
        console.log("Drivers:", drivers);
        console.log("Driver Categories:", driverCategories);

        tasks.forEach((task, index) => {
            const driver = getDriverById(task.driverId);
            const vehicle = getVehicleById(task.vehicleId);

            console.log(`\nTask ${index + 1}:`, {
                taskId: task.taskId,
                groupName: task.groupName,
                driverName: driver?.name || "未指定",
                vehicleCode: vehicle?.code || "未指定",
                startTime: task.startTime,
                endTime: task.endTime,
                status: task.status
            });
        });

        console.log("\n=== End Schedule Data ===");
    };

    const handleSave = () => logScheduleData("保存");
    const handleConfirm = () => logScheduleData("計画確定");
    const handleClose = () => logScheduleData("実績投入後締め");

    return (
        <div className="h-screen flex flex-col bg-[#FEF9F3] overflow-hidden">
            <div className="shrink-0">
                <Header />
            </div>

            <main className="flex-1 flex flex-col gap-4 min-h-0 p-2">
                <div className="flex-[3] min-h-0">
                    <HourlyScheduleTable
                        ref={scheduleTableRef}
                        className="h-full"
                        tasks={tasks}
                        drivers={drivers}
                        vehicles={vehicles}
                        onTimeSlotChange={handleTimeSlotChange}
                        onDriverClick={handleDriverClick}
                    />
                </div>

                <div className="flex-[2] min-h-0">
                    <DriverListSection
                        className="h-full"
                        driverCategories={driverCategories}
                        historyLogs={historyLogs}
                        onReset={handlePageReset}
                    />
                </div>

                <div className="shrink-0">
                    <FooterActions
                        onSave={handleSave}
                        onConfirm={handleConfirm}
                        onClose={handleClose}
                    />
                </div>
            </main>

            <DriverEditModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onSave={handleAssignDriver}
                driverCategories={driverCategories}
                initialFilter="予備"
                currentDriver={
                    selectedTask?.driverId
                        ? { name: getDriverById(selectedTask.driverId)?.name || "" }
                        : null
                }
            />
        </div>
    );
}
