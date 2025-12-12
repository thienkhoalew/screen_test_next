"use client";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DailyStatus, Driver, DriverStats } from "@/types";

const DATES = Array.from({ length: 18 }, (_, i) => i + 14);
const WEEKADAYS = ["火", "水", "木", "金", "土", "日", "月"];

const getWeekday = (day: number) => {
    const index = (day - 14) % 7;
    return WEEKADAYS[index];
};

const isWeekend = (day: number) => {
    const wd = getWeekday(day);
    return wd === "土" || wd === "日";
};

import { MOCK_DRIVERS, FOOTER_DATA } from "@/data/details";

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
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold mx-auto">
                {status.statusText}
            </div>
        );
    }
    if (status.type === "special") {
        return (
            <div className="h-10 w-10 bg-red-200 rounded-md mx-auto"></div>
        )
    }

    // Work type
    return (
        <div className="flex flex-col items-center justify-center text-xs font-semibold text-gray-700">
            <span className="text-[10px] text-gray-500">{status.code}</span>
            <span className="bg-gray-100 px-1 rounded text-gray-400">{status.value}</span>
        </div>
    );
};

const HeaderDateCell = ({ day }: { day: number }) => {
    const weekday = getWeekday(day);
    const isSat = weekday === "土";
    const isSun = weekday === "日";

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <span className={cn("text-lg font-bold", isSat && "text-blue-500", isSun && "text-red-500")}>{day}</span>
            <span className={cn("text-sm", isSat && "text-blue-500", isSun && "text-red-500")}>
                {weekday}
                {isSat || isSun ? "" : "平日"}
                {isSat && "学休"}
                {isSun && "学休"}
            </span>
        </div>
    );
};

export default function DetailsTable() {
    return (
        <TooltipProvider>
            <div className="overflow-auto h-full w-full">
                <Table className="border-collapse border border-gray-300 min-w-[1200px]">
                    <TableHeader className="bg-gray-50 sticky top-0 z-10">
                        <TableRow className="h-16">
                            <TableHead className="w-24 border border-gray-300 bg-gray-100 text-center text-black font-bold">勤務<br />グループ</TableHead>
                            <TableHead className="w-32 border border-gray-300 bg-gray-100 text-center text-black font-bold text-nowrap">運転手</TableHead>
                            {DATES.map((day) => (
                                <TableHead key={day} className="w-16 border border-gray-300 bg-gray-50 text-center p-1">
                                    <HeaderDateCell day={day} />
                                </TableHead>
                            ))}

                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs">出勤日数</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs">休日日数</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs">拘束時間</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs">ハンドル時間</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs">ヘビー仕業</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs">サブ仕業</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {MOCK_DRIVERS.map((driver) => (
                            <TableRow key={driver.id} className="h-16 hover:bg-transparent">
                                <TableCell className="border border-gray-300 text-center font-medium bg-white">{driver.group}</TableCell>
                                <TableCell className="border border-gray-300 text-center font-medium bg-white text-nowrap">{driver.name}</TableCell>
                                {DATES.map((day) => (
                                    <TableCell key={day} className="border border-gray-300 p-0 text-center hover:bg-gray-50 transition-colors bg-white">
                                        <StatusCell status={driver.schedule[day] || null} day={day} />
                                    </TableCell>
                                ))}
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50">{driver.stats.workDays}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50">{driver.stats.holidayDays}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50">{driver.stats.constraintTime}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50">{driver.stats.handleTime}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50">{driver.stats.heavyWork}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50">{driver.stats.subWork}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow className="bg-yellow-50 font-medium">
                            <TableCell colSpan={2} className="border border-gray-300 text-center py-2">未割付仕業数</TableCell>
                            {DATES.map((day) => (
                                <TableCell key={day} className="border border-gray-300 text-center py-2 text-gray-700">
                                    {FOOTER_DATA.unassignedWorkCount[day as keyof typeof FOOTER_DATA.unassignedWorkCount]}
                                </TableCell>
                            ))}
                            <TableCell colSpan={6} className="bg-gray-300 border border-gray-300"></TableCell>
                        </TableRow>

                        <TableRow className="bg-yellow-50 font-medium h-20">
                            <TableCell colSpan={2} className="border border-gray-300 text-center py-2">未割付仕業番号</TableCell>
                            {DATES.map((day) => {
                                const tasks = FOOTER_DATA.unassignedWorkNumber[day as keyof typeof FOOTER_DATA.unassignedWorkNumber];
                                return (
                                    <TableCell key={day} className="border border-gray-300 text-center py-1 text-xs px-1 align-top">
                                        {tasks && tasks.map((task, idx) => (
                                            <Tooltip key={idx}>
                                                <TooltipTrigger asChild>
                                                    <div className="mb-1 cursor-pointer hover:underline hover:text-blue-600">{task}</div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="font-bold">{task}</p>
                                                    <p className="text-xs">出勤時間 07:30 退勤時間 21:30</p>
                                                    <p className="text-xs">拘束時間 14:00 走行距離 30km</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                    </TableCell>
                                )
                            })}
                            <TableCell colSpan={6} className="bg-gray-300 border border-gray-300"></TableCell>
                        </TableRow>

                        <TableRow className="bg-red-50 font-medium">
                            <TableCell colSpan={2} className="border border-gray-300 text-center py-2">不足数</TableCell>
                            {DATES.map((day) => {
                                const count = FOOTER_DATA.shortage[day as keyof typeof FOOTER_DATA.shortage];
                                return (
                                    <TableCell key={day} className="border border-gray-300 text-center py-2">
                                        {count && <span className="text-red-500 font-bold">{count}</span>}
                                    </TableCell>
                                )
                            })}
                            <TableCell colSpan={6} className="bg-gray-300 border border-gray-300"></TableCell>
                        </TableRow>

                        <TableRow className="bg-green-50 font-medium">
                            <TableCell colSpan={2} className="border border-gray-300 text-center py-2">外部応援見込数</TableCell>
                            {DATES.map((day) => {
                                const count = FOOTER_DATA.scanExpectation[day as keyof typeof FOOTER_DATA.scanExpectation];
                                return (
                                    <TableCell key={day} className="border border-gray-300 text-center py-2 text-gray-700">
                                        {count}
                                    </TableCell>
                                )
                            })}
                            <TableCell colSpan={6} className="bg-green-100 border border-gray-300"></TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
        </TooltipProvider>
    );
}
