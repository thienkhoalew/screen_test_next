import { cn } from "@/lib/utils";
import { getWeekday, isSaturday, isSunday, isWeekend } from "@/lib/weekday-utils";

export interface HeaderDateCellConfig {
    startDayOfWeek?: number; // 0=Sunday, 1=Monday, etc. Default: 1 (Monday)
    saturdayLabel?: string; // Label for Saturday, default: "学休"
    sundayLabel?: string; // Label for Sunday, default: "学休"
    weekdayLabel?: string; // Label for weekday, default: "平日"
    weekendLabel?: string; // Label for weekend, default: "休日"
    highlightWeekend?: boolean; // Highlight weekend with color, default: true
    saturdayColor?: string; // Color for Saturday, default: "text-blue-500 bg-blue-50"
    sundayColor?: string; // Color for Sunday, default: "text-red-500 bg-red-50"
    weekendColor?: string; // Color for weekend (if not using separate colors), default: "text-blue-500 bg-blue-50"
    useSeparateWeekendColors?: boolean; // Use different colors for Sat and Sun, default: false
}

export const createHeaderDateCell = (config: HeaderDateCellConfig = {}) => {
    const {
        startDayOfWeek = 1,
        saturdayLabel = "学休",
        sundayLabel = "学休",
        weekdayLabel = "平日",
        weekendLabel = "休日",
        highlightWeekend = true,
        saturdayColor = "text-blue-500",
        sundayColor = "text-red-500",
        weekendColor = "text-blue-500 bg-blue-50",
        useSeparateWeekendColors = false,
    } = config;

    return function HeaderDateCell({ day }: { day: number }) {
        const weekday = getWeekday(day, startDayOfWeek);
        const isSat = isSaturday(weekday);
        const isSun = isSunday(weekday);
        const isWeekendDay = isWeekend(weekday);

        // Determine color classes
        let colorClass = "";
        if (highlightWeekend && isWeekendDay) {
            if (useSeparateWeekendColors) {
                colorClass = isSat ? saturdayColor : sundayColor;
            } else {
                colorClass = weekendColor;
            }
        }

        // Determine label
        let label = "";
        if (isWeekendDay) {
            if (useSeparateWeekendColors) {
                label = isSat ? saturdayLabel : sundayLabel;
            } else {
                label = weekendLabel;
            }
        } else {
            label = weekdayLabel;
        }

        return (
            <div className={cn("flex flex-col items-center justify-center h-full", colorClass)}>
                <span className="text-lg font-bold">{day}</span>
                <span className="text-xs">
                    {weekday}
                    {label}
                </span>
            </div>
        );
    };
};
