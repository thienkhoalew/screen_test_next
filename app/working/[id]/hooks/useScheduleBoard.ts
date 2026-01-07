import { MOCK_DRIVERS, FOOTER_DATA } from "@/data/details";
import { useScheduleBoard as useSharedScheduleBoard } from "@/hooks/useScheduleBoard";

export const useScheduleBoard = () => {
    return useSharedScheduleBoard({
        initialDrivers: MOCK_DRIVERS,
        initialUnassignedWorks: FOOTER_DATA.unassignedWorkNumber,
        initialHistoryLogs: [],
        enableAssistantLogic: true,
        enableHistory: true,
    });
};
