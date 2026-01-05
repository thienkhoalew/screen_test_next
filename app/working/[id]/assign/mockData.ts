export interface Driver {
    id: string;
    name: string;
    attendanceStatus?: string;
    tomorrowMovementTime?: string;
    nextDayHandleTime?: string;
    holidayTime?: string;
    holidayNextDayHandleTime?: string;
    location?: string;
}

export interface Vehicle {
    id: string;
    code: string;
}

export interface TaskSegment {
    type: "actual" | "delivery" | "charging";
    duration: number;
}

export interface TimeSlot {
    id: string;
    startTime: string;
    endTime: string;
    duration: number;
    taskType?: "actual" | "delivery" | "charging";
    segments?: TaskSegment[];
    tripNumber?: string;
    taskId?: string;
}

export interface DailyTask {
    id: string;
    groupName: string;
    taskId: string;
    driverId?: string;
    vehicleId?: string;
    startTime: string;
    endTime: string;
    destinationTime: string;
    returnTime: string;
    startHour: number;
    duration: number;
    status: "assigned" | "unassigned" | "completed";
    taskType?: "actual" | "delivery" | "charging";
    segments?: TaskSegment[];
    tripNumber?: string;
    timeSlots?: TimeSlot[];
}

export const mockDrivers: Driver[] = [
    { id: "d1", name: "小林 太郎", attendanceStatus: "予備", tomorrowMovementTime: "02:00", nextDayHandleTime: "09:00", holidayTime: "09:00", holidayNextDayHandleTime: "08:00" },
    { id: "d2", name: "山本 太郎", attendanceStatus: "予備", tomorrowMovementTime: "03:00", nextDayHandleTime: "10:00", holidayTime: "08:00", holidayNextDayHandleTime: "07:00" },
    { id: "d3", name: "吉田 太郎", attendanceStatus: "予備", tomorrowMovementTime: "02:00", nextDayHandleTime: "09:00" },
    { id: "d4", name: "佐々木 太郎", attendanceStatus: "予備", tomorrowMovementTime: "01:00", nextDayHandleTime: "08:00" },

    { id: "d5", name: "鈴木 一郎", attendanceStatus: "助勤・外部応援", location: "他営業所", tomorrowMovementTime: "02:00", nextDayHandleTime: "08:00" },
    { id: "d6", name: "高橋 次郎", attendanceStatus: "助勤・外部応援", tomorrowMovementTime: "01:00" },

    { id: "d7", name: "伊藤 三郎", attendanceStatus: "公休" },
    { id: "d8", name: "渡辺 四郎", attendanceStatus: "公休" },
    { id: "d9", name: "中村 五郎", attendanceStatus: "公休" },

    { id: "d10", name: "小川 六郎", attendanceStatus: "有休" },
    { id: "d11", name: "加藤 七郎", attendanceStatus: "有休" },

    {
        id: "d12",
        name: "斎藤 八郎",
        attendanceStatus: "乗務不可",
        tomorrowMovementTime: "20:00",
        nextDayHandleTime: "09:00",
        holidayTime: "09:00",
        holidayNextDayHandleTime: "08:00"
    },
    {
        id: "d13",
        name: "松本 九郎",
        attendanceStatus: "乗務不可",
        tomorrowMovementTime: "22:00",
        nextDayHandleTime: "10:00",
        holidayTime: "08:00",
        holidayNextDayHandleTime: "09:00"
    },

    { id: "d14", name: "山口未来", attendanceStatus: "割付済み", tomorrowMovementTime: "12:00", nextDayHandleTime: "09:00" },
    { id: "d15", name: "田中太郎", attendanceStatus: "割付済み", tomorrowMovementTime: "06:00" },
    { id: "d16", name: "木村太郎", attendanceStatus: "割付済み", tomorrowMovementTime: "11:00", nextDayHandleTime: "08:00", holidayTime: "10:00" },
];

export const mockVehicles: Vehicle[] = [
    { id: "v1", code: "1234" },
    { id: "v2", code: "2345" },
    { id: "v3", code: "3456" },
    { id: "v4", code: "4567" },
    { id: "v5", code: "5678" },
    { id: "v6", code: "6789" },
    { id: "v7", code: "7890" },
    { id: "v8", code: "8901" },
];

export const mockDailyTasks: DailyTask[] = [
    {
        id: "t1",
        groupName: "Aグループ",
        taskId: "A-261",
        driverId: "d14",
        vehicleId: "v1",
        startTime: "12:00",
        endTime: "21:00",
        destinationTime: "15:00",
        returnTime: "12:30",
        startHour: 12,
        duration: 9,
        status: "assigned",
        taskType: "actual",
        tripNumber: "0101",
        segments: [
            { type: "delivery", duration: 20 },
            { type: "actual", duration: 500 },
            { type: "delivery", duration: 20 },
        ]
    },
    {
        id: "t2",
        groupName: "Aグループ",
        taskId: "A-262",
        driverId: "d15",
        vehicleId: "v2",
        startTime: "06:00",
        endTime: "10:00",
        destinationTime: "17:00",
        returnTime: "14:00",
        startHour: 6,
        duration: 4,
        status: "assigned",
        taskType: "actual",
        tripNumber: "0205",
        segments: [
            { type: "delivery", duration: 40 },
            { type: "actual", duration: 160 },
            { type: "delivery", duration: 40 },
        ]
    },
    {
        id: "t3",
        groupName: "Bグループ",
        taskId: "B-102",
        driverId: "d16",
        vehicleId: "v3",
        startTime: "08:00",
        endTime: "16:00",
        destinationTime: "20:00",
        returnTime: "10:30",
        startHour: 8,
        duration: 8,
        status: "assigned",
        tripNumber: "MULT",
        timeSlots: [
            {
                id: "t3-1",
                startTime: "08:00",
                endTime: "09:20",
                duration: 80 / 60,
                taskType: "actual",
                tripNumber: "0301",
                taskId: "B-102-1",
                segments: [
                    { type: "delivery", duration: 20 },
                    { type: "actual", duration: 40 },
                    { type: "delivery", duration: 20 },
                ]
            },
            {
                id: "t3-2",
                startTime: "10:00",
                endTime: "11:20",
                duration: 80 / 60,
                taskType: "actual",
                tripNumber: "0302",
                taskId: "B-102-2",
                segments: [
                    { type: "delivery", duration: 20 },
                    { type: "actual", duration: 60 },
                ]
            },
            {
                id: "t3-3",
                startTime: "13:00",
                endTime: "14:00",
                duration: 1,
                taskType: "actual",
                tripNumber: "0303",
                taskId: "B-102-3",
                segments: [
                    { type: "actual", duration: 40 },
                    { type: "delivery", duration: 20 },
                ]
            },
            {
                id: "t3-4",
                startTime: "15:00",
                endTime: "16:00",
                duration: 1,
                taskType: "actual",
                tripNumber: "0304",
                taskId: "B-102-4",
                segments: [
                    { type: "actual", duration: 60 },
                ]
            }
        ]
    },
    {
        id: "t4",
        groupName: "Bグループ",
        taskId: "B-103",
        driverId: undefined,
        vehicleId: undefined,
        startTime: "08:00",
        endTime: "15:00",
        destinationTime: "15:00",
        returnTime: "15:00",
        startHour: 8,
        duration: 7,
        status: "unassigned",
        taskType: "actual",
        tripNumber: "0450",
    },
    {
        id: "t5",
        groupName: "Cグループ",
        taskId: "C-301",
        driverId: undefined,
        vehicleId: "v4",
        startTime: "00:00",
        endTime: "12:00",
        destinationTime: "14:00",
        returnTime: "11:30",
        startHour: 0,
        duration: 12,
        status: "unassigned",
        taskType: "actual",
        tripNumber: "0501",
        timeSlots: [
            {
                id: "t5-1",
                startTime: "00:00",
                endTime: "02:00",
                duration: 2,
                taskType: "actual",
                tripNumber: "0501",
                segments: [{ type: "delivery", duration: 20 }, { type: "actual", duration: 100 }]
            },
            {
                id: "t5-2",
                startTime: "04:00",
                endTime: "05:00",
                duration: 1,
                taskType: "actual",
                tripNumber: "0502",
                segments: [{ type: "actual", duration: 40 }, { type: "delivery", duration: 20 }]
            },
            {
                id: "t5-3",
                startTime: "07:00",
                endTime: "08:40",
                duration: 100 / 60,
                taskType: "actual",
                tripNumber: "0503",
                segments: [{ type: "delivery", duration: 20 }, { type: "actual", duration: 60 }, { type: "delivery", duration: 20 }]
            },
            {
                id: "t5-4",
                startTime: "10:00",
                endTime: "12:00",
                duration: 2,
                taskType: "actual",
                tripNumber: "0504",
                segments: [{ type: "actual", duration: 120 }]
            }
        ]
    },
    {
        id: "t6",
        groupName: "Cグループ",
        taskId: "C-302",
        driverId: undefined,
        vehicleId: undefined,
        startTime: "08:00",
        endTime: "20:00",
        destinationTime: "11:00",
        returnTime: "09:30",
        startHour: 8,
        duration: 12,
        status: "unassigned",
        taskType: "charging",
    },
    {
        id: "t7",
        groupName: "Dグループ",
        taskId: "D-401",
        driverId: undefined,
        vehicleId: "v5",
        startTime: "10:00",
        endTime: "00:00",
        destinationTime: "14:00",
        returnTime: "12:00",
        startHour: 10,
        duration: 14,
        status: "unassigned",
        taskType: "actual",
        tripNumber: "1023",
    },
    {
        id: "t8",
        groupName: "Dグループ",
        taskId: "D-402",
        driverId: undefined,
        vehicleId: undefined,
        startTime: "03:00",
        endTime: "10:00",
        destinationTime: "14:00",
        returnTime: "12:00",
        startHour: 3,
        duration: 7,
        status: "unassigned",
        taskType: "actual",
        tripNumber: "0845",
    },
];
