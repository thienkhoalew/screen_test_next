export type DailyStatus = {
    type: "work" | "holiday" | "paid" | "absence" | "unknown" | "assistant" | "unavailable" | "reserve" | string;
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
    vehicle?: string;
    schedule: Record<number, DailyStatus | DailyStatus[]>;
    stats: DriverStats;
};

export type VehicleStats = {
    operatingDays: number;
    nonOperatingDays: number;
    unavailableDays: number;
    reserveDays: number;
};

export type Vehicle = {
    id: string;
    group: string;
    number: string;
    schedule: Record<number, DailyStatus | DailyStatus[]>;
    stats: VehicleStats;
};
