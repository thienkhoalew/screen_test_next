"use client";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "@/components/shared/dnd";
import { TaskCard } from "@/components/shared/cards";
import { FOOTER_DATA } from "@/data/details";
import { Driver, DailyStatus } from "@/types";
import { ComponentType } from "react";

export interface MonthlyScheduleTableProps {
    drivers: Driver[];
    unassignedWorks?: Record<number, DailyStatus[]>;
    historyLogs?: { timestamp: string; message: string }[];
    numberOfDays?: number;
    onDragEnd?: (event: DragEndEvent) => void;
    onStatusChange?: (driverId: string, day: number, newStatus: DailyStatus | DailyStatus[]) => void;
    onTaskAssignment?: (day: number, task: DailyStatus, driverId?: string) => void;
    onReset?: () => void;
    HeaderDateCell: ComponentType<{ day: number }>;
    StatusCell: ComponentType<any>;
    HistoryPanel?: ComponentType<{ logs: { timestamp: string; message: string }[]; onReset: () => void }>;
    showDragDrop?: boolean;
    showHistoryPanel?: boolean;
    showUnassignedWorks?: boolean;
    showFooterRows?: boolean;
    showContextMenu?: boolean;
    showPopover?: boolean;
    AssistantTaskAlert?: ComponentType<{ code: string; value: string }>;
    footerData?: {
        unassignedWorkCount?: Record<number, number | string>;
        shortage?: Record<number, number>;
        scanExpectation?: Record<number, number>;
    };
}

export function MonthlyScheduleTable({
    drivers,
    unassignedWorks = {},
    historyLogs = [],
    numberOfDays = 31,
    onDragEnd,
    onStatusChange,
    onTaskAssignment,
    onReset,
    HeaderDateCell,
    StatusCell,
    HistoryPanel,
    showDragDrop = true,
    showHistoryPanel = true,
    showUnassignedWorks = true,
    showFooterRows = true,
    showContextMenu = false,
    showPopover = false,
    AssistantTaskAlert,
    footerData,
}: MonthlyScheduleTableProps) {
    const DATES = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    const displayFooter = footerData || FOOTER_DATA;

    const tableContent = (
        <TooltipProvider>
            <div className="overflow-auto h-full w-full">
                <Table className="border-collapse border border-gray-300 min-w-max">
                    <TableHeader className="bg-gray-50 sticky top-0 z-40">
                        <TableRow className="h-16">
                            <TableHead className="w-24 border border-gray-300 bg-gray-100 text-center text-black font-bold sticky left-0 z-50">勤務<br />グループ</TableHead>
                            <TableHead className="w-32 border border-gray-300 bg-gray-100 text-center text-black font-bold text-nowrap sticky left-24 z-50">運転手</TableHead>
                            {DATES.map((day) => (
                                <TableHead key={day} className="w-16 border border-gray-300 bg-gray-50 text-center p-1 min-w-[4rem]">
                                    <HeaderDateCell day={day} />
                                </TableHead>
                            ))}
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs sticky right-[400px] z-50 shadow-[-1px_0_0_0_rgba(209,213,219,1)]">出勤日数</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs sticky right-[320px] z-50">休日日数</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs sticky right-[240px] z-50">拘束時間</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs sticky right-[160px] z-50">ハンドル時間</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs sticky right-[80px] z-50">ヘビー仕業</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs sticky right-0 z-50">サブ仕業</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {drivers.map((driver) => (
                            <TableRow key={driver.id} className="h-16 hover:bg-transparent group">
                                <TableCell className="border border-gray-300 text-center py-2 sticky left-0 z-30 bg-gray-50 font-medium text-xs">{driver.group}</TableCell>
                                <TableCell className="border border-gray-300 text-center py-2 sticky left-24 z-30 bg-white font-medium text-sm whitespace-nowrap">{driver.name}</TableCell>
                                {DATES.map((day) => {
                                    const status = driver.schedule[day] || null;
                                    const s = Array.isArray(status) ? status[0] : status;
                                    const isHelp = s?.type === "help";
                                    return (
                                        <TableCell
                                            key={day}
                                            className={`border border-gray-300 text-center p-1 min-w-[4rem] align-top relative ${isHelp ? "bg-[#666D78]" : ""
                                                }`}
                                        >
                                            <StatusCell
                                                status={status}
                                                day={day}
                                                driverId={driver.id}
                                                unassignedTasks={unassignedWorks[day as keyof typeof unassignedWorks] || []}
                                                onStatusChange={onStatusChange}
                                                onTaskAssigned={onTaskAssignment}
                                                isAssistant={driver.name.includes("助勤")}
                                                showContextMenu={showContextMenu}
                                                showPopover={showPopover}
                                                AssistantTaskAlert={AssistantTaskAlert}
                                            />
                                        </TableCell>
                                    );
                                })}
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50 sticky right-[400px] z-30 shadow-[-1px_0_0_0_rgba(209,213,219,1)]">{driver.stats.workDays}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50 sticky right-[320px] z-30">{driver.stats.holidayDays}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50 sticky right-[240px] z-30">{driver.stats.constraintTime}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50 sticky right-[160px] z-30">{driver.stats.handleTime}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50 sticky right-[80px] z-30">{driver.stats.heavyWork}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50 sticky right-0 z-30">{driver.stats.subWork}</TableCell>
                            </TableRow>
                        ))}

                        {showFooterRows && (
                            <>
                                {showUnassignedWorks && (
                                    <TableRow className="bg-yellow-50 font-medium h-20">
                                        <TableCell colSpan={2} className="border border-gray-300 text-center py-2 sticky left-0 z-30 bg-yellow-50">未割付仕業番号</TableCell>
                                        {DATES.map((day) => {
                                            const tasks = unassignedWorks[day as keyof typeof unassignedWorks];
                                            return (
                                                <TableCell key={day} className="border border-gray-300 text-center py-1 text-xs px-1 align-top min-w-[4rem]">
                                                    {tasks && tasks.map((task, idx) => task && (
                                                        <Draggable key={idx} id={`unassigned-${day}-${idx}`} data={task} className="mb-1">
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className="cursor-grab active:cursor-grabbing">
                                                                        <TaskCard
                                                                            code={task.code || ""}
                                                                            value={task.value || ""}
                                                                            hideValue={true}
                                                                            className="bg-gray-100 border border-gray-200 rounded shadow-sm"
                                                                        />
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p className="font-bold">{task.code || ""}</p>
                                                                    <p className="text-xs">出勤時間 {task.startTime || ""} 退勤時間 {task.endTime || ""}</p>
                                                                    <p className="text-xs">拘束時間 {task.constraintTime || ""} 走行距離 {task.distance || ""}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </Draggable>
                                                    ))}
                                                </TableCell>
                                            );
                                        })}
                                        {showHistoryPanel && HistoryPanel ? (
                                            <TableCell colSpan={6} rowSpan={3} className="bg-gray-100 border border-gray-300 sticky right-0 z-30 shadow-[-1px_0_0_0_rgba(209,213,219,1)] p-2 align-top">
                                                <HistoryPanel logs={historyLogs} onReset={onReset || (() => { })} />
                                            </TableCell>
                                        ) : (
                                            <TableCell colSpan={6} rowSpan={3} className="bg-gray-100 border border-gray-300 sticky right-0 z-30"></TableCell>
                                        )}
                                    </TableRow>
                                )}

                                <TableRow className="bg-red-50 font-medium">
                                    <TableCell colSpan={2} className="border border-gray-300 text-center py-2 sticky left-0 z-30 bg-red-50">不足数</TableCell>
                                    {DATES.map((day) => {
                                        const count = displayFooter.shortage?.[day as keyof typeof displayFooter.shortage];
                                        return (
                                            <TableCell key={day} className="border border-gray-300 text-center py-2 min-w-[4rem]">
                                                {count && <span className="text-red-500 font-bold">{count}</span>}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>

                                <TableRow className="bg-green-50 font-medium">
                                    <TableCell colSpan={2} className="border border-gray-300 text-center py-2 sticky left-0 z-30 bg-green-50">外部応援見込数</TableCell>
                                    {DATES.map((day) => {
                                        const count = displayFooter.scanExpectation?.[day as keyof typeof displayFooter.scanExpectation];
                                        return (
                                            <TableCell key={day} className="border border-gray-300 text-center py-2 text-gray-700 min-w-[4rem]">
                                                {count}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>
        </TooltipProvider>
    );

    return showDragDrop && onDragEnd ? (
        <DndContext onDragEnd={onDragEnd}>
            {tableContent}
        </DndContext>
    ) : (
        tableContent
    );
}
