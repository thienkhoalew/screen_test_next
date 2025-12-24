import { Driver } from "@/types";

export const MOCK_HELP_DRIVERS: Driver[] = [
    {
        id: "1", group: "Aグループ", name: "山田 太郎",
        schedule: {
            2: { type: "work", code: "A-101", value: "A1001" },
            3: { type: "work", code: "A-102", value: "A1002" },
            5: { type: "work", code: "A-103", value: "A1003" },
            12: { type: "work", code: "A-104", value: "A1004" },
            15: { type: "work", code: "A-105", value: "A1005" },
            19: { type: "work", code: "A-106", value: "A1006" },
            22: { type: "work", code: "A-107", value: "A1007" },
            26: { type: "work", code: "A-108", value: "A1008" },
            29: { type: "work", code: "A-109", value: "A1009" },
        },
        stats: { workDays: 9, holidayDays: 0, constraintTime: 81.0, handleTime: 72.0, heavyWork: 5, subWork: 4 }
    },
    {
        id: "2", group: "Aグループ", name: "佐藤 次郎",
        schedule: {
            1: { type: "paid", statusText: "有" },
            4: { type: "work", code: "B-201", value: "B2001" },
            6: { type: "work", code: "B-202", value: "B2002" },
            11: { type: "work", code: "B-203", value: "B2003" },
            16: { type: "work", code: "B-204", value: "B2004" },
            20: { type: "work", code: "B-205", value: "B2005" },
            23: { type: "work", code: "B-206", value: "B2006" },
            27: { type: "work", code: "B-207", value: "B2007" },
            30: { type: "work", code: "B-208", value: "B2008" },
        },
        stats: { workDays: 8, holidayDays: 1, constraintTime: 72.0, handleTime: 64.0, heavyWork: 4, subWork: 4 }
    },
    {
        id: "3", group: "Aグループ", name: "鈴木 三郎",
        schedule: {
            2: { type: "paid", statusText: "有" },
            4: { type: "work", code: "C-301", value: "C3001" },
            7: { type: "work", code: "C-302", value: "C3002" },
            9: { type: "unknown", statusText: "不" },
            10: { type: "paid", statusText: "有" },
            13: { type: "work", code: "C-303", value: "C3003" },
            17: { type: "work", code: "C-304", value: "C3004" },
            24: { type: "work", code: "C-305", value: "C3005" },
            28: { type: "work", code: "C-306", value: "C3006" },
            31: { type: "work", code: "C-307", value: "C3007" },
        },
        stats: { workDays: 7, holidayDays: 2, constraintTime: 63.0, handleTime: 56.0, heavyWork: 4, subWork: 3 }
    },
    {
        id: "4", group: "Aグループ", name: "渡辺 七子",
        schedule: {
            3: { type: "unknown", statusText: "不" },
            5: { type: "work", code: "X-123", value: "X1111" },
            8: { type: "work", code: "D-401", value: "D4001" },
            14: { type: "work", code: "D-402", value: "D4002" },
            18: { type: "work", code: "D-403", value: "D4003" },
            21: { type: "work", code: "D-404", value: "D4004" },
            25: { type: "work", code: "D-405", value: "D4005" },
        },
        stats: { workDays: 6, holidayDays: 1, constraintTime: 54.0, handleTime: 48.0, heavyWork: 3, subWork: 3 }
    },
    {
        id: "5", group: "Bグループ", name: "田中 四郎",
        schedule: {
            1: { type: "work", code: "E-501", value: "E5001" },
            6: { type: "work", code: "E-502", value: "E5002" },
            12: { type: "work", code: "E-503", value: "E5003" },
            16: { type: "work", code: "E-504", value: "E5004" },
            20: { type: "work", code: "E-505", value: "E5005" },
            23: { type: "work", code: "E-506", value: "E5006" },
            27: { type: "work", code: "E-507", value: "E5007" },
            30: { type: "work", code: "E-508", value: "E5008" },
        },
        stats: { workDays: 8, holidayDays: 0, constraintTime: 72.0, handleTime: 64.0, heavyWork: 5, subWork: 3 }
    },
    {
        id: "6", group: "Bグループ", name: "伊藤 五郎",
        schedule: {
            2: { type: "unknown", statusText: "不" },
            6: { type: "paid", statusText: "有" },
            10: { type: "work", code: "F-601", value: "F6001" },
            13: { type: "work", code: "F-602", value: "F6002" },
            17: { type: "work", code: "F-603", value: "F6003" },
            21: { type: "work", code: "F-604", value: "F6004" },
            24: { type: "work", code: "F-605", value: "F6005" },
            28: { type: "work", code: "F-606", value: "F6006" },
        },
        stats: { workDays: 6, holidayDays: 2, constraintTime: 54.0, handleTime: 48.0, heavyWork: 3, subWork: 3 }
    },
    {
        id: "7", group: "Bグループ", name: "中村 八郎",
        schedule: {
            4: { type: "paid", statusText: "有" },
            8: { type: "work", code: "Y-123", value: "Y1111" },
            10: { type: "unknown", statusText: "不" },
            11: { type: "work", code: "G-701", value: "G7001" },
            14: { type: "work", code: "G-702", value: "G7002" },
            18: { type: "work", code: "G-703", value: "G7003" },
            22: { type: "work", code: "G-704", value: "G7004" },
            26: { type: "work", code: "G-705", value: "G7005" },
            29: { type: "work", code: "G-706", value: "G7006" },
        },
        stats: { workDays: 7, holidayDays: 2, constraintTime: 63.0, handleTime: 56.0, heavyWork: 4, subWork: 3 }
    },
    {
        id: "8", group: "Cグループ", name: "高橋 六郎",
        schedule: {
            9: { type: "paid", statusText: "有" },
            3: { type: "work", code: "H-801", value: "H8001" },
            7: { type: "work", code: "H-802", value: "H8002" },
            12: { type: "work", code: "H-803", value: "H8003" },
            15: { type: "work", code: "H-804", value: "H8004" },
            19: { type: "work", code: "H-805", value: "H8005" },
            25: { type: "work", code: "H-806", value: "H8006" },
            31: { type: "work", code: "H-807", value: "H8007" },
        },
        stats: { workDays: 7, holidayDays: 1, constraintTime: 63.0, handleTime: 56.0, heavyWork: 4, subWork: 3 }
    },
    {
        id: "9", group: "Cグループ", name: "小林 九美 (助勤)",
        schedule: {
            ...Object.fromEntries(Array.from({ length: 31 }, (_, i) => [i + 1, { type: "help", statusText: "助勤可能" }]))
        },
        stats: { workDays: 0, holidayDays: 0, constraintTime: 0.0, handleTime: 0.0, heavyWork: 0, subWork: 0 }
    },
    {
        id: "10", group: "ー", name: "加藤 十郎 (助勤)",
        schedule: {
            2: { type: "help", statusText: "助勤可能" },
            5: { type: "help", statusText: "助勤可能" },
            9: { type: "help", statusText: "助勤可能" },
            11: { type: "help", statusText: "助勤可能" },
            16: { type: "help", statusText: "助勤可能" },
            20: { type: "help", statusText: "助勤可能" },
            23: { type: "help", statusText: "助勤可能" },
            27: { type: "help", statusText: "助勤可能" },
            30: { type: "help", statusText: "助勤可能" },
        },
        stats: { workDays: 0, holidayDays: 0, constraintTime: 0.0, handleTime: 0.0, heavyWork: 0, subWork: 0 }
    },
];

export const FOOTER_DATA = {
    unassignedWorkNumber: {
        1: [
            { type: "work", code: "特-764", value: "T7001", startTime: "08:00", endTime: "17:00", constraintTime: "9.0", distance: "150km" }
        ],
        3: [
            { type: "work", code: "特-645", value: "T6001", startTime: "09:00", endTime: "18:00", constraintTime: "9.0", distance: "120km" }
        ],
        10: [
            { type: "work", code: "特-656", value: "T6501", startTime: "07:30", endTime: "16:30", constraintTime: "9.0", distance: "180km" }
        ],
        15: [
            { type: "work", code: "特-721", value: "T7201", startTime: "08:30", endTime: "17:30", constraintTime: "9.0", distance: "160km" }
        ],
        22: [
            { type: "work", code: "特-892", value: "T8901", startTime: "07:00", endTime: "16:00", constraintTime: "9.0", distance: "140km" }
        ],
    },
    shortage: {
    },
    scanExpectation: {
    },
};
