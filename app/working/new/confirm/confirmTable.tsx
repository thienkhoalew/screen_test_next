"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DailyStatus } from "@/types";
import { MOCK_HELP_DRIVERS, FOOTER_DATA } from "@/data/confirm";
import TableWrapper from "@/components/ui/table-wrapper";

const HELP_DATES = Array.from({ length: 11 }, (_, i) => i + 1);
const WEEKADAYS = ["水", "木", "金", "土", "日", "月", "火", "水", "木", "金", "土"];

const getWeekday = (day: number) => {
    const index = (day - 1) % 11;
    return WEEKADAYS[index];
};

const StatusCell = ({ status, day }: { status: DailyStatus; day: number }) => {
    if (!status) return <div className="h-full w-full"></div>;

    if (status.type === "holiday") {
        return (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mx-auto">
                {status.statusText}
            </div>
        );
    }
    if (status.type === "paid") {
        return (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold mx-auto">
                {status.statusText}
            </div>
        );
    }
    if (status.type === "unknown") {
        return (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 font-bold mx-auto">
                {status.statusText}
            </div>
        );
    }

    if (status.type === "help") {
        return (
            <div className="h-full w-full flex items-center justify-center text-[10px] text-white">
                {status.statusText}
            </div>
        )
    }

    // Work type
    return (
        <div className="flex flex-col items-center justify-center text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded p-0.5">
            <span className="text-[10px] text-gray-500">{status.code}</span>
            <span className="bg-gray-100 px-1 rounded text-gray-400 border border-gray-300">{status.value}</span>
        </div>
    );
};

const HeaderDateCell = ({ day }: { day: number }) => {
    const weekday = getWeekday(day);
    const isSat = weekday === "土";
    const isSun = weekday === "日";
    const isBlue = day === 4 || day === 11;
    const isRed = day === 5;

    return (
        <div className={cn("flex flex-col items-center justify-center h-full",
            isBlue && "text-blue-500 bg-blue-50",
            isRed && "text-red-500 bg-red-50"
        )}>
            <span className="text-lg font-bold">{day}</span>
            <span className="text-xs">
                {weekday}
                {!isBlue && !isRed && "平日"}
                {isBlue && "学休"}
                {isRed && "学休"}
            </span>
        </div>
    );
};

export default function ConfirmTable() {
    return (
        <TableWrapper title={
            <div className="flex items-center gap-3">
                <span>勤務表期間 : 2025/12/01~2025/12/31</span>
                <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded text-xs border border-green-200">有給</span>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-0.5 rounded text-xs border border-yellow-200">乗務不可日</span>
                </div>
            </div>
        }>
            <TooltipProvider>
                <div className="overflow-auto h-full w-full">
                    <Table className="border-collapse border border-gray-300 min-w-[1200px]">
                        <TableHeader className="bg-gray-50 sticky top-0 z-10">
                            <TableRow className="h-10">
                                <TableHead className="w-24 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs p-1">勤務<br />グループ</TableHead>
                                <TableHead className="w-32 border border-gray-300 bg-gray-100 text-center text-black font-bold text-nowrap text-xs p-1">運転手</TableHead>
                                {HELP_DATES.map((day) => {
                                    const weekday = getWeekday(day);
                                    const isBlue = day === 4 || day === 11;
                                    const isRed = day === 5;
                                    return (
                                        <TableHead key={day} className={cn("w-16 border border-gray-300 text-center p-0", isBlue && "bg-blue-50", isRed && "bg-red-50", !isBlue && !isRed && "bg-gray-50")}>
                                            <HeaderDateCell day={day} />
                                        </TableHead>
                                    )
                                })}

                                <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs p-1">出勤日数</TableHead>
                                <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs p-1">休日日数</TableHead>
                                <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs p-1">拘束時間</TableHead>
                                <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs p-1">ハンドル時間</TableHead>
                                <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs p-1">ヘビー仕業</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_HELP_DRIVERS.map((driver) => (
                                <TableRow key={driver.id} className="h-10 hover:bg-transparent">
                                    <TableCell className="border border-gray-300 text-center font-medium bg-gray-50 text-xs p-1">{driver.group}</TableCell>
                                    <TableCell className="border border-gray-300 text-center font-medium bg-gray-50 text-nowrap text-xs p-1">{driver.name}</TableCell>
                                    {HELP_DATES.map((day) => {
                                        const status = driver.schedule[day] || null;
                                        const isHelp = status?.type === "help";
                                        return (
                                            <TableCell key={day} className={cn(
                                                "border border-gray-300 p-0 text-center transition-colors min-w-[60px]",
                                                isHelp ? "bg-[#666D78] hover:bg-[#666D78]" : "bg-white hover:bg-gray-50"
                                            )}>
                                                <StatusCell status={status} day={day} />
                                            </TableCell>
                                        )
                                    })}
                                    <TableCell className="border border-gray-300 text-center text-sm bg-blue-50/30 p-1">{driver.stats.workDays}</TableCell>
                                    <TableCell className="border border-gray-300 text-center text-sm bg-blue-50/30 p-1">{driver.stats.holidayDays}</TableCell>
                                    <TableCell className="border border-gray-300 text-center text-sm bg-blue-50/30 p-1">{driver.stats.constraintTime.toFixed(1)}</TableCell>
                                    <TableCell className="border border-gray-300 text-center text-sm bg-blue-50/30 p-1">{driver.stats.handleTime.toFixed(1)}</TableCell>
                                    <TableCell className="border border-gray-300 text-center text-sm bg-blue-50/30 p-1">{driver.stats.heavyWork}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow className="bg-yellow-50 font-medium h-12">
                                <TableCell colSpan={2} className="border border-gray-300 text-center py-1 text-xs px-1">未割付仕業番号</TableCell>
                                {HELP_DATES.map((day) => {
                                    const task = FOOTER_DATA.unassignedWorkNumber[day as keyof typeof FOOTER_DATA.unassignedWorkNumber];
                                    return (
                                        <TableCell key={day} className="border border-gray-300 text-center py-1 text-blue-800 font-bold text-xs p-0">
                                            {task}
                                        </TableCell>
                                    )
                                })}
                                <TableCell colSpan={5} className="bg-yellow-50 border border-gray-300"></TableCell>
                            </TableRow>

                            <TableRow className="bg-green-50 font-medium h-12">
                                <TableCell colSpan={2} className="border border-gray-300 text-center py-1 text-xs px-1">外部応援見込数</TableCell>
                                {HELP_DATES.map((day) => (
                                    <TableCell key={day} className="border border-gray-300 text-center py-1 bg-white p-0"></TableCell>
                                ))}
                                <TableCell colSpan={5} className="bg-green-50 border border-gray-300"></TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            </TooltipProvider>
        </TableWrapper>
    );
}
