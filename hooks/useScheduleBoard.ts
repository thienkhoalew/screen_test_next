import { useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { Driver, DailyStatus } from "@/types";

export interface UseScheduleBoardConfig<T extends Record<number, DailyStatus[]>> {
    initialDrivers: Driver[];
    initialUnassignedWorks: T;
    initialHistoryLogs?: { timestamp: string; message: string }[];
    enableAssistantLogic?: boolean; // Enable complex assistant slot logic (for details table)
    enableHistory?: boolean; // Enable history tracking
}

export const useScheduleBoard = <T extends Record<number, DailyStatus[]>>({
    initialDrivers,
    initialUnassignedWorks,
    initialHistoryLogs = [],
    enableAssistantLogic = false,
    enableHistory = false,
}: UseScheduleBoardConfig<T>) => {
    const [drivers, setDrivers] = useState(initialDrivers);
    const [unassignedWorks, setUnassignedWorks] = useState(initialUnassignedWorks);
    const [historyLogs, setHistoryLogs] = useState(initialHistoryLogs);

    const addHistory = (message: string) => {
        if (!enableHistory) return;
        const timestamp = new Date().toLocaleString("ja-JP");
        setHistoryLogs(prev => [...prev, { timestamp, message }]);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = String(active.id);
        const overId = String(over.id);

        if (!overId.startsWith("cell-")) return;

        const [__, targetDriverId, targetDayStr] = overId.split("-");
        const targetDay = parseInt(targetDayStr);

        if (activeId.startsWith("unassigned-")) {
            const [_, sourceDayStr, sourceIndexStr] = activeId.split("-");
            const sourceDay = parseInt(sourceDayStr);
            const sourceIndex = parseInt(sourceIndexStr);

            if (sourceDay !== targetDay) return;

            const taskToMove = (unassignedWorks as Record<number, DailyStatus[]>)[sourceDay]?.[sourceIndex];
            if (!taskToMove) return;

            const targetDriverCheck = drivers.find(d => d.id === targetDriverId);
            if (!targetDriverCheck) return;

            const currentStatusCheck = targetDriverCheck.schedule[targetDay];

            // Different logic based on enableAssistantLogic
            if (enableAssistantLogic) {
                // Complex logic for details table with assistant slots
                let isAssistantSlot = false;
                if (Array.isArray(currentStatusCheck)) {
                    const hasAssistantSlot = currentStatusCheck.some(s => s && s.type === "assistant");
                    if (!hasAssistantSlot) return;
                    isAssistantSlot = true;
                } else if (currentStatusCheck && currentStatusCheck.type === "assistant") {
                    isAssistantSlot = true;
                }

                setDrivers(prev => prev.map(driver => {
                    if (driver.id !== targetDriverId) return driver;

                    const currentStatus = driver.schedule[targetDay];
                    let newStatus: DailyStatus | DailyStatus[];

                    const taskType = isAssistantSlot ? "assistant" : "work";

                    const newTask = {
                        ...taskToMove,
                        type: taskType,
                        code: taskToMove.code,
                        value: taskToMove.value,
                    };

                    if (Array.isArray(currentStatus)) {
                        const newStatusList = [...currentStatus];
                        const assistantIndex = newStatusList.findIndex(s => s && s.type === "assistant" && (!s.code || s.code === ""));

                        if (assistantIndex !== -1) {
                            newStatusList[assistantIndex] = newTask;
                            newStatus = newStatusList;
                        } else {
                            return driver;
                        }
                    } else {
                        newStatus = newTask;
                    }

                    return {
                        ...driver,
                        schedule: {
                            ...driver.schedule,
                            [targetDay]: newStatus
                        }
                    };
                }));

                addHistory(`${targetDriverCheck.name} に ${taskToMove.code} を割り当てました`);
            } else {
                // Simple logic for confirm table
                if (currentStatusCheck) {
                    const status = Array.isArray(currentStatusCheck) ? currentStatusCheck[0] : currentStatusCheck;
                    if (status && status.type !== "help") return;
                }

                setDrivers(prev => prev.map(driver => {
                    if (driver.id !== targetDriverId) return driver;

                    const newTask = {
                        ...taskToMove,
                        type: "work",
                        code: taskToMove.code,
                        value: taskToMove.value,
                    };

                    return {
                        ...driver,
                        schedule: {
                            ...driver.schedule,
                            [targetDay]: newTask
                        }
                    };
                }));
            }

            setUnassignedWorks(prev => {
                const dayWorks = (prev as Record<number, DailyStatus[]>)[sourceDay] || [];
                const newDayWorks = [...dayWorks];
                newDayWorks.splice(sourceIndex, 1);
                return {
                    ...prev,
                    [sourceDay]: newDayWorks
                } as T;
            });
        } else if (activeId.startsWith("assigned-")) {
            // Handle dragging assigned task from one cell to another
            const [_, sourceDriverId, sourceDayStr] = activeId.split("-");
            const sourceDay = parseInt(sourceDayStr);

            // Get source task
            const sourceDriver = drivers.find(d => d.id === sourceDriverId);
            if (!sourceDriver) return;

            const sourceTask = sourceDriver.schedule[sourceDay];
            if (!sourceTask) return;

            // Get target driver
            const targetDriver = drivers.find(d => d.id === targetDriverId);
            if (!targetDriver) return;

            const targetTask = targetDriver.schedule[targetDay];

            // Swap or move tasks
            setDrivers(prev => prev.map(driver => {
                if (sourceDriverId === targetDriverId && driver.id === sourceDriverId) {
                    // Same driver - swap/move within same driver's schedule
                    return {
                        ...driver,
                        schedule: {
                            ...driver.schedule,
                            [sourceDay]: targetTask || null,
                            [targetDay]: sourceTask
                        }
                    };
                } else if (driver.id === sourceDriverId) {
                    // Different driver - remove from source
                    return {
                        ...driver,
                        schedule: {
                            ...driver.schedule,
                            [sourceDay]: targetTask || null
                        }
                    };
                } else if (driver.id === targetDriverId) {
                    // Different driver - add to target
                    return {
                        ...driver,
                        schedule: {
                            ...driver.schedule,
                            [targetDay]: sourceTask
                        }
                    };
                }
                return driver;
            }));

            if (enableHistory) {
                const sourceDriverName = sourceDriver.name;
                const targetDriverName = targetDriver.name;
                const taskCode = Array.isArray(sourceTask) ? sourceTask[0]?.code : sourceTask.code;
                addHistory(`${taskCode} を ${sourceDriverName} から ${targetDriverName} に移動しました`);
            }
        }
    };

    const handleStatusChange = (driverId: string, day: number, newStatus: DailyStatus | DailyStatus[]) => {
        setDrivers(prev => prev.map(driver => {
            if (driver.id !== driverId) return driver;
            return {
                ...driver,
                schedule: {
                    ...driver.schedule,
                    [day]: newStatus
                }
            };
        }));
    };

    const handleTaskAssignment = (day: number, task: DailyStatus, driverId: string = "") => {
        if (!task) return;

        setUnassignedWorks(prev => {
            const dayWorks = (prev as Record<number, DailyStatus[]>)[day] || [];
            if (!dayWorks) return prev;
            const newDayWorks = dayWorks.filter((t: DailyStatus) => t !== task);
            return {
                ...prev,
                [day]: newDayWorks
            } as T;
        });
    };

    const handleReset = () => {
        setDrivers(initialDrivers);
        setUnassignedWorks(initialUnassignedWorks);
        setHistoryLogs([]);
        addHistory("スケジュールをリセットしました");
    };

    return {
        drivers,
        unassignedWorks,
        historyLogs,
        handleDragEnd,
        handleStatusChange,
        handleTaskAssignment,
        handleReset,
        addHistory, // Expose addHistory for custom logging
    };
};
