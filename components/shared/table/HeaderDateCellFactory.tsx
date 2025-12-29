import { cn } from "@/lib/utils";
import { getWeekday, isSaturday, isSunday, isWeekend } from "@/lib/weekday-utils";

export interface HeaderDateCellConfig {
    startDayOfWeek?: number;
    saturdayLabel?: string;
    sundayLabel?: string;
    weekdayLabel?: string;
    weekendLabel?: string;
    highlightWeekend?: boolean;
    saturdayColor?: string;
    sundayColor?: string;
    weekendColor?: string;
    useSeparateWeekendColors?: boolean;
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

        let colorClass = "";
        if (highlightWeekend && isWeekendDay) {
            if (useSeparateWeekendColors) {
                colorClass = isSat ? saturdayColor : sundayColor;
            } else {
                colorClass = weekendColor;
            }
        }

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
