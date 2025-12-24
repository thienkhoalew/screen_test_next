import { cn } from "@/lib/utils";
import { createHeaderDateCell } from "@/components/shared/HeaderDateCellFactory";

// Create HeaderDateCell with details table configuration  
// Details table shows separate colors for Saturday (blue) and Sunday (red)
export const HeaderDateCell = createHeaderDateCell({
    startDayOfWeek: 1, // Monday
    saturdayLabel: "学休",
    sundayLabel: "学休",
    weekdayLabel: "平日",
    highlightWeekend: true,
    saturdayColor: "text-blue-500",
    sundayColor: "text-red-500",
    useSeparateWeekendColors: true,
});
