import { Driver } from "@/types";

export const MOCK_HELP_DRIVERS: Driver[] = [
    {
        id: "1", group: "Aグループ", name: "山田 太郎",
        schedule: {},
        stats: { workDays: 0, holidayDays: 0, constraintTime: 0.0, handleTime: 0.0, heavyWork: 0, subWork: 0 }
    },
    {
        id: "2", group: "Aグループ", name: "佐藤 次郎",
        schedule: { 1: { type: "paid", statusText: "有" } },
        stats: { workDays: 0, holidayDays: 1, constraintTime: 0.0, handleTime: 0.0, heavyWork: 0, subWork: 0 }
    },
    {
        id: "3", group: "Aグループ", name: "鈴木 三郎",
        schedule: { 2: { type: "paid", statusText: "有" }, 9: { type: "unknown", statusText: "不" }, 10: { type: "paid", statusText: "有" } },
        stats: { workDays: 0, holidayDays: 2, constraintTime: 0.0, handleTime: 0.0, heavyWork: 1, subWork: 1 }
    },
    {
        id: "4", group: "Aグループ", name: "渡辺 七子",
        schedule: {
            3: { type: "unknown", statusText: "不" },
            5: { type: "work", code: "X-123", value: "X1111" }
        },
        stats: { workDays: 0, holidayDays: 0, constraintTime: 0.0, handleTime: 0.0, heavyWork: 2, subWork: 2 }
    },
    {
        id: "5", group: "Bグループ", name: "田中 四郎",
        schedule: {},
        stats: { workDays: 0, holidayDays: 0, constraintTime: 0.0, handleTime: 0.0, heavyWork: 2, subWork: 2 }
    },
    {
        id: "6", group: "Bグループ", name: "伊藤 五郎",
        schedule: { 2: { type: "unknown", statusText: "不" }, 6: { type: "paid", statusText: "有" } },
        stats: { workDays: 0, holidayDays: 1, constraintTime: 0.0, handleTime: 0.0, heavyWork: 2, subWork: 2 }
    },
    {
        id: "7", group: "Bグループ", name: "中村 八郎",
        schedule: {
            4: { type: "paid", statusText: "有" },
            8: { type: "work", code: "Y-123", value: "Y1111" },
            10: { type: "unknown", statusText: "不" }
        },
        stats: { workDays: 0, holidayDays: 1, constraintTime: 0.0, handleTime: 0.0, heavyWork: 2, subWork: 2 }
    },
    {
        id: "8", group: "Cグループ", name: "高橋 六郎",
        schedule: { 9: { type: "paid", statusText: "有" } },
        stats: { workDays: 0, holidayDays: 1, constraintTime: 0.0, handleTime: 0.0, heavyWork: 1, subWork: 1 }
    },
    {
        id: "9", group: "Cグループ", name: "小林 九美 (助勤)",
        schedule: {
            1: { type: "help", statusText: "助勤可能" },
            2: { type: "help", statusText: "助勤可能" },
            3: { type: "help", statusText: "助勤可能" },
            4: { type: "help", statusText: "助勤可能" },
            5: { type: "help", statusText: "助勤可能" },
            6: { type: "help", statusText: "助勤可能" },
            7: { type: "help", statusText: "助勤可能" },
            8: { type: "help", statusText: "助勤可能" },
            9: { type: "help", statusText: "助勤可能" },
            10: { type: "help", statusText: "助勤可能" },
            11: { type: "help", statusText: "助勤可能" },
        },
        stats: { workDays: 0, holidayDays: 0, constraintTime: 0.0, handleTime: 0.0, heavyWork: 3, subWork: 3 }
    },
    {
        id: "10", group: "ー", name: "加藤 十郎 (助勤)",
        schedule: {
            102: { type: "help", statusText: "助勤可能" }, // Fixed key to mock logic, wait, keys in table are 1-11
            2: { type: "help", statusText: "助勤可能" },
            5: { type: "help", statusText: "助勤可能" },
            9: { type: "help", statusText: "助勤可能" },
        },
        stats: { workDays: 0, holidayDays: 1, constraintTime: 0.0, handleTime: 0.0, heavyWork: 2, subWork: 2 }
    },
];

export const FOOTER_DATA = {
    unassignedWorkNumber: {
        1: "特-764",
        3: "特-645",
        10: "特-656"
    },
};
