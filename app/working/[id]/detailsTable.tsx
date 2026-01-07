"use client";

import { forwardRef, useImperativeHandle, useMemo } from "react";
import { MonthlyScheduleTable } from "@/components/features/schedule/MonthlyScheduleTable";
import { createHeaderDateCell } from "@/components/shared/table";
import { StatusCell } from "@/components/shared/table";
import { HistoryPanel } from "@/app/working/[id]/components/HistoryPanel";
import { AssistantTaskAlert } from "@/app/working/[id]/components/AssistantTaskAlert";
import { useScheduleBoard } from "@/app/working/[id]/hooks/useScheduleBoard";
import { Driver, DailyStatus } from "@/types";

export interface DetailsTableRef {
    getScheduleData: () => {
        drivers: Driver[];
        unassignedWorks: Record<number, DailyStatus[]>;
    };
}

const DetailsTable = forwardRef<DetailsTableRef>((props, ref) => {
    const {
        drivers,
        unassignedWorks,
        historyLogs,
        handleDragEnd,
        handleStatusChange,
        handleTaskAssignment,
        handleReset
    } = useScheduleBoard();

    useImperativeHandle(ref, () => ({
        getScheduleData: () => ({
            drivers,
            unassignedWorks
        })
    }));

    const HeaderDateCell = useMemo(
        () => createHeaderDateCell({
            startDayOfWeek: 1,
            saturdayLabel: "学休",
            sundayLabel: "学休",
            weekdayLabel: "平日",
            highlightWeekend: true,
            saturdayColor: "text-blue-500",
            sundayColor: "text-[#FB2C36] bg-[#FDF2F8]",
            useSeparateWeekendColors: true,
            workingId: "1",
        }),
        []
    );

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
