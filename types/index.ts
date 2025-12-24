export type DailyStatus = {
    type: "work" | "holiday" | "paid" | "absence" | "unknown" | "assistant" | string;
    code?: string;
    value?: string;
    subValue?: string;
    statusText?: string;
    startTime?: string;
    endTime?: string;
    constraintTime?: string;
    distance?: string;
} | null;

export type DriverStats = {
    workDays: number;
    holidayDays: number;
    constraintTime: number;
    handleTime: number;
    heavyWork: number;
    subWork: number;
};

export type Driver = {
    id: string;
    group: string;
    name: string;
    schedule: Record<number, DailyStatus | DailyStatus[]>;
    stats: DriverStats;
};
