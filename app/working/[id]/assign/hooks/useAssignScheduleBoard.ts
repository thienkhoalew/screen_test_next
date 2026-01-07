import { useScheduleBoard as useSharedScheduleBoard } from "@/hooks/useScheduleBoard";

const INITIAL_DRIVERS: any[] = [];
const INITIAL_UNASSIGNED_WORKS: Record<number, any[]> = {};

export const useAssignScheduleBoard = () => {
    return useSharedScheduleBoard({
        initialDrivers: INITIAL_DRIVERS,
        initialUnassignedWorks: INITIAL_UNASSIGNED_WORKS,
        initialHistoryLogs: [],
        enableAssistantLogic: false,
        enableHistory: true,
    });
};
