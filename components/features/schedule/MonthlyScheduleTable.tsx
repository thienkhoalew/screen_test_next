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
import { getWeekday, isSunday } from "@/lib/weekday-utils";
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
            <div className="overflow-auto h-full w-full max-h-[600px]">
                <table className="min-w-max w-full text-xs" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                    {/* Header - Sticky Top */}
                    <thead className="sticky top-0 z-40">
                        <tr className="h-[45px] text-[12px]">
                            <th className="w-[60px] bg-[#F9FAFB] text-center text-black font-bold sticky left-0 z-50 border border-gray-300">勤務<br />グループ</th>
                            <th className="w-[80px] bg-[#EFF6FF] text-center text-black font-bold text-nowrap sticky left-[60px] z-50 border border-gray-300">運転手</th>
                            {DATES.map((day) => {
                                const weekday = getWeekday(day, 1); // Monday start
                                const isSun = isSunday(weekday);
                                return (
                                    <th
                                        key={day}
                                        className={`w-[50px] border border-gray-300 text-center text-[#6A7282] p-1 min-w-[4rem] ${isSun ? 'bg-[#FDF2F8]' : 'bg-gray-50'
                                            }`}
                                    >
                                        <HeaderDateCell day={day} />
                                    </th>
                                );
                            })}
                            <th className="w-[65px] bg-[#EFF6FF] text-center text-black font-bold sticky right-[400px] z-50 border border-gray-300 shadow-[-2px_0_0_0_rgb(209_213_219)]">出勤日数</th>
                            <th className="w-[65px] bg-[#EFF6FF] text-center text-black font-bold sticky right-[320px] z-50 border border-gray-300">休日日数</th>
                            <th className="w-[65px] bg-[#EFF6FF] text-center text-black font-bold sticky right-[240px] z-50 border border-gray-300">拘束時間</th>
                            <th className="w-[78px] bg-[#EFF6FF] text-center text-black font-bold sticky right-[160px] z-50 border border-gray-300">ハンドル時間</th>
                            <th className="w-[81px] bg-[#EFF6FF] text-center text-black font-bold sticky right-[80px] z-50 border border-gray-300">ヘビー仕業</th>
                            <th className="w-[78px] bg-[#EFF6FF] text-center text-black font-bold sticky right-0 z-50 border border-gray-300">サブ仕業</th>
                        </tr>
                    </thead>

                    {/* Body - Scrollable */}
                    <tbody>
                        {drivers.map((driver) => (
                            <tr key={driver.id} className="h-[55px] hover:bg-transparent group">
                                <td className="w-[60px] text-center sticky left-0 z-30 bg-[#F9FAFB] border border-gray-300">{driver.group}</td>
                                <td className="w-[80px] text-center sticky left-[60px] z-30 bg-[#EFF6FF] border border-gray-300">{driver.name}</td>
                                {DATES.map((day) => {
                                    const status = driver.schedule[day] || null;
                                    const s = Array.isArray(status) ? status[0] : status;
                                    const isHelp = s?.type === "help";
                                    return (
                                        <td
                                            key={day}
                                            className={`border border-gray-300 text-center p-0.5 min-w-[4rem] align-top relative ${isHelp ? "bg-[#666D78]" : ""
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
                                        </td>
                                    );
                                })}
                                <td className="w-20 text-center bg-[#EFF6FF] sticky right-[400px] z-30 border border-gray-300 shadow-[-2px_0_0_0_rgb(209_213_219)]">{driver.stats.workDays}</td>
                                <td className="w-20 text-center bg-[#EFF6FF] sticky right-[320px] z-30 border border-gray-300">{driver.stats.holidayDays}</td>
                                <td className="w-20 text-center bg-[#EFF6FF] sticky right-[240px] z-30 border border-gray-300">{driver.stats.constraintTime}</td>
                                <td className="w-20 text-center bg-[#EFF6FF] sticky right-[160px] z-30 border border-gray-300">{driver.stats.handleTime}</td>
                                <td className="w-20 text-center bg-[#EFF6FF] sticky right-[80px] z-30 border border-gray-300">{driver.stats.heavyWork}</td>
                                <td className="w-20 text-center bg-[#EFF6FF] sticky right-0 z-30 border border-gray-300">{driver.stats.subWork}</td>
                            </tr>
                        ))}
                    </tbody>

                    {/* Footer - Sticky Bottom */}
                    {showFooterRows && (
                        <tfoot className="sticky bottom-0 z-40">
                            {showUnassignedWorks && (
                                <tr className="bg-[#FEFCE8] font-medium h-[49px]">
                                    <td colSpan={2} className="text-center sticky left-0 z-50 bg-[#FEFCE8] border border-gray-300">未割付仕業数</td>
                                    {DATES.map((day) => {
                                        const count = displayFooter.unassignedWorkCount?.[day as keyof typeof displayFooter.unassignedWorkCount];
                                        return (
                                            <td key={day} className="border border-gray-300 text-center min-w-[4rem]">
                                                {count !== undefined && count !== 0 && <span className="text-gray-700">{count}</span>}
                                            </td>
                                        );
                                    })}
                                    {showHistoryPanel && HistoryPanel ? (
                                        <td colSpan={6} rowSpan={4} className="w-[480px] bg-gray-100 sticky right-0 z-50 p-2 align-top border border-gray-300 shadow-[-2px_0_0_0_rgb(209_213_219)]">
                                            <div className="h-[196px]">
                                                <HistoryPanel logs={historyLogs} onReset={onReset || (() => { })} />
                                            </div>
                                        </td>
                                    ) : (
                                        <td colSpan={6} rowSpan={4} className="w-[480px] bg-gray-100 sticky right-0 z-50 border border-gray-300"></td>
                                    )}
                                </tr>
                            )}

                            {showUnassignedWorks && (
                                <tr className="bg-[#FEFCE8] h-[49px]">
                                    <td colSpan={2} className="text-center sticky left-0 z-50 bg-[#FEFCE8] border border-gray-300">未割付仕業番号</td>
                                    {DATES.map((day) => {
                                        const tasks = unassignedWorks[day as keyof typeof unassignedWorks];
                                        return (
                                            <td key={day} className="border border-gray-300 text-center min-w-[4rem]">
                                                {tasks && tasks.map((task, idx) => task && (
                                                    <Draggable key={idx} id={`unassigned-${day}-${idx}`} data={task} className="mb-1">
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <div className="cursor-grab active:cursor-grabbing">
                                                                    <TaskCard
                                                                        code={task.code || ""}
                                                                        value={task.value || ""}
                                                                        hideValue={true}
                                                                        className="bg-[#F3F4F6] border border-gray-200 rounded-[4px] h-[19px] w-[80%] mx-auto shadow-sm gap-0 py-0"
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
                                            </td>
                                        );
                                    })}
                                </tr>
                            )}

                            <tr className="bg-[#FEF2F2] h-[49px]">
                                <td colSpan={2} className="text-center sticky left-0 z-50 bg-[#FEF2F2] border border-gray-300">不足数</td>
                                {DATES.map((day) => {
                                    const count = displayFooter.shortage?.[day as keyof typeof displayFooter.shortage];
                                    return (
                                        <td key={day} className="h-[49px] border border-gray-300 text-center min-w-[4rem]">
                                            {count && <span className="text-red-500 font-bold">{count}</span>}
                                        </td>
                                    );
                                })}
                            </tr>

                            <tr className="bg-[#F0FDF4] h-[49px]">
                                <td colSpan={2} className="text-center sticky left-0 z-50 bg-[#F0FDF4] border border-gray-300">外部応援見込数</td>
                                {DATES.map((day) => {
                                    const count = displayFooter.scanExpectation?.[day as keyof typeof displayFooter.scanExpectation];
                                    return (
                                        <td key={day} className="border border-gray-300 text-center min-w-[4rem]">
                                            {count}
                                        </td>
                                    );
                                })}
                            </tr>
                        </tfoot>
                    )}
                </table>
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
