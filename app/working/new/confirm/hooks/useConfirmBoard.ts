import { MOCK_HELP_DRIVERS, FOOTER_DATA } from "@/data/confirm";
import { useScheduleBoard as useSharedScheduleBoard } from "@/hooks/useScheduleBoard";

export const useConfirmBoard = () => {
    return useSharedScheduleBoard({
        initialDrivers: MOCK_HELP_DRIVERS,
        initialUnassignedWorks: FOOTER_DATA.unassignedWorkNumber,
        initialHistoryLogs: [],
        enableAssistantLogic: false,
        enableHistory: false,
    });
};
