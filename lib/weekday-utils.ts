/**
 * Calculate weekday for a given day in the month
 * @param day - Day of the month (1-31)
 * @param startDayOfWeek - Starting day of the week for day 1 (0=Sunday, 1=Monday, etc.)
 * @returns Weekday string in Japanese
 */
export const getWeekday = (day: number, startDayOfWeek: number = 1): string => {
    const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
    const dayOfWeek = (startDayOfWeek + day - 1) % 7;
    return WEEKDAYS[dayOfWeek];
};

/**
 * Check if a weekday is Saturday
 */
export const isSaturday = (weekday: string): boolean => weekday === "土";

/**
 * Check if a weekday is Sunday
 */
export const isSunday = (weekday: string): boolean => weekday === "日";

/**
 * Check if a weekday is a weekend (Saturday or Sunday)
 */
export const isWeekend = (weekday: string): boolean => isSaturday(weekday) || isSunday(weekday);
