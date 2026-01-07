"use client";

import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import TableWrapper from "@/components/features/schedule/TableWrapper";
import { Button } from "@/components/ui/button";
import TimeSlotBar from "@/components/features/hourly/TimeSlotBar";
import {
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Table,
} from "@/components/ui/table";
import { DailyTask, Driver, Vehicle } from "./mockData";

interface HourlyScheduleTableProps {
    className?: string;
    tasks: DailyTask[];
    drivers: Driver[];
    vehicles: Vehicle[];
    onTimeSlotChange?: (task: DailyTask, oldStartTime: string, newStartTime: string, newEndTime: string) => void;
    onDriverClick?: (task: DailyTask) => void;
}

export interface HourlyScheduleTableRef {
    getScheduleData: () => {
        tasks: DailyTask[];
    };
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const HOUR_WIDTH = 75;
const MINUTES_PER_SLOT = 20;

function hourToTimeString(hour: number, minute: number = 0): string {
    const h = hour % 24;
    return `${String(h).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function calculateEndTime(startHour: number, startMinute: number, durationHours: number): string {
    const totalStartMinutes = startHour * 60 + startMinute;
    const durationMinutes = Math.round(durationHours * 60);
    const totalEndMinutes = totalStartMinutes + durationMinutes;

    const endHour = Math.floor(totalEndMinutes / 60) % 24;
    const endMinute = totalEndMinutes % 60;

    return `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
}

const HourlyScheduleTable = forwardRef<HourlyScheduleTableRef, HourlyScheduleTableProps>(
    ({ className, tasks, drivers, vehicles, onTimeSlotChange, onDriverClick }, ref) => {
        const [draggedTask, setDraggedTask] = useState<DailyTask | null>(null);
        const [dragOffset, setDragOffset] = useState(0);
        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const fixedBodyRef = useRef<HTMLDivElement>(null);
        const scrollableBodyRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            getScheduleData: () => ({
                tasks
            })
        }));

        const handleFixedScroll = () => {
            if (fixedBodyRef.current && scrollableBodyRef.current) {
                scrollableBodyRef.current.scrollTop = fixedBodyRef.current.scrollTop;
            }
        };

        const handleHeaderScroll = () => {
            if (scrollContainerRef.current && scrollableBodyRef.current) {
                if (scrollableBodyRef.current.scrollLeft !== scrollContainerRef.current.scrollLeft) {
                    scrollableBodyRef.current.scrollLeft = scrollContainerRef.current.scrollLeft;
                }
            }
        };

        const handleScrollableScroll = () => {
            if (fixedBodyRef.current && scrollableBodyRef.current) {
                fixedBodyRef.current.scrollTop = scrollableBodyRef.current.scrollTop;
            }
            if (scrollContainerRef.current && scrollableBodyRef.current) {
                if (scrollContainerRef.current.scrollLeft !== scrollableBodyRef.current.scrollLeft) {
                    scrollContainerRef.current.scrollLeft = scrollableBodyRef.current.scrollLeft;
                }
            }
        };

        const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: DailyTask) => {
            setDraggedTask(task);
            const rect = e.currentTarget.getBoundingClientRect();
            setDragOffset(e.clientX - rect.left);
            e.currentTarget.style.opacity = "0.5";
        };

        const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
            e.currentTarget.style.opacity = "1";
            setDraggedTask(null);
        };

        const handleDrop = (e: React.DragEvent<HTMLDivElement>, rowIndex: number) => {
            e.preventDefault();
            if (!draggedTask) return;

            const scrollContainer = scrollContainerRef.current;
            if (!scrollContainer) return;

            const containerRect = scrollContainer.getBoundingClientRect();
            const scrollLeft = scrollContainer.scrollLeft;

            const relativeX = e.clientX - containerRect.left + scrollLeft - dragOffset;
            const totalHours = Math.max(0, relativeX / HOUR_WIDTH);
            const totalMinutes = Math.round((totalHours * 60) / MINUTES_PER_SLOT) * MINUTES_PER_SLOT;

            const newStartHour = Math.floor(totalMinutes / 60);
            const newStartMinute = totalMinutes % 60;

            const dragged = draggedTask as any;

            if (newStartHour >= 24) return;

            const durationMinutes = Math.round(dragged.duration * 60);
            if (totalMinutes + durationMinutes > 1440) return;

            const parentId = dragged._parentId || dragged.id;

            const taskIndex = tasks.findIndex(s => s.id === parentId);
            if (taskIndex !== rowIndex) return;

            const originalTask = tasks[taskIndex];
            const updatedTask = { ...originalTask };

            if (dragged._slotId && updatedTask.timeSlots) {
                const newStartTotalMins = newStartHour * 60 + newStartMinute;
                const newEndTotalMins = newStartTotalMins + durationMinutes;

                const hasOverlap = updatedTask.timeSlots.some(slot => {
                    if (slot.id === dragged._slotId) return false;

                    const [sH, sM] = slot.startTime.split(':').map(Number);
                    const slotStartMins = sH * 60 + sM;
                    const slotEndMins = slotStartMins + Math.round(slot.duration * 60);

                    return newStartTotalMins < slotEndMins && newEndTotalMins > slotStartMins;
                });

                if (hasOverlap) return;
            }

            const newStartTime = hourToTimeString(newStartHour, newStartMinute);
            const newEndTime = calculateEndTime(newStartHour, newStartMinute, dragged.duration);

            if (dragged._slotId && updatedTask.timeSlots) {
                updatedTask.timeSlots = updatedTask.timeSlots.map(s =>
                    s.id === dragged._slotId
                        ? { ...s, startTime: newStartTime, endTime: newEndTime }
                        : s
                );
            } else {
                updatedTask.startTime = newStartTime;
                updatedTask.endTime = newEndTime;
                updatedTask.startHour = newStartHour;
            }

            if (onTimeSlotChange) {
                onTimeSlotChange(updatedTask, dragged.startTime, newStartTime, newEndTime);
            }
        };

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
        };

        const getDriverName = (driverId?: string): string => {
            if (!driverId) return "未割付";
            const driver = drivers.find(d => d.id === driverId);
            return driver?.name || "未割付";
        };

        const getVehicleCode = (vehicleId?: string): string => {
            if (!vehicleId) return "未割付";
            const vehicle = vehicles.find(v => v.id === vehicleId);
            return vehicle?.code || "未割付";
        };

        return (
            <TableWrapper title="" className={className}>
                <div className="flex flex-col overflow-auto border border-[#E5DDD0] rounded-md">
                    <div className="flex items-center justify-between px-3 py-2 shrink-0">
                        <div className="flex gap-5">
                            <Button variant="grayBordered" className="w-[73px]">分割</Button>
                            <Button variant="grayBordered" className="w-[73px]">任意</Button>
                            <Button variant="grayBordered" className="w-[99px]">回送設定</Button>
                        </div>
                        <div className="flex gap-7 text-[24px]">
                            <div className="flex items-center gap-2">
                                <div className="w-[85px] h-[40px] rounded bg-[#2B7FFF]"></div>
                                <span>実車</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-[85px] h-[40px] rounded bg-[#9EC5FF]"></div>
                                <span>回送</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-[85px] h-[40px] rounded bg-[#7CB342]"></div>
                                <span>充電</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 min-h-0 overflow-hidden">
                        <div className="shrink-0 border-r bg-gray-50 flex flex-col pb-5">
                            <Table className="w-full border-collapse">
                                <TableHeader>
                                    <TableRow className="h-[25px] border-b hover:bg-gray-100">
                                        <TableHead rowSpan={2} className="text-center text-[16px] bg-[#F5F5F5] border-r align-middle w-[112px]">編成グループ</TableHead>
                                        <TableHead rowSpan={2} className="text-center text-[16px] bg-[#F5F5F5] border-r align-middle w-[95px]">仕業ID</TableHead>
                                        <TableHead rowSpan={2} className="text-center text-[16px] bg-[#E3F2FD] border-r align-middle w-[112px]">運転手</TableHead>
                                        <TableHead rowSpan={2} className="text-center text-[16px] bg-[#E3F2FD] border-r align-middle w-[112px]">車両</TableHead>
                                        <TableHead colSpan={2} className="text-center text-[14px] border-r bg-white align-middle w-[127px]">勤務開始時刻</TableHead>
                                        <TableHead colSpan={2} className="text-center text-[14px] border-r bg-white align-middle w-[127px]">勤務終了時刻</TableHead>
                                        <TableHead colSpan={2} className="text-center text-[14px] border-r bg-white align-middle w-[127px]">拘束時間</TableHead>
                                        <TableHead colSpan={2} className="text-center text-[14px] bg-white align-middle w-[127px]">ハンドル時間</TableHead>
                                    </TableRow>

                                    <TableRow className="h-[25px] text-[14px] border-b hover:bg-gray-100">
                                        <TableHead className="text-center bg-white border-r align-middle">予定</TableHead>
                                        <TableHead className="text-center bg-white border-r align-middle">実績</TableHead>
                                        <TableHead className="text-center bg-white border-r align-middle">予定</TableHead>
                                        <TableHead className="text-center bg-white border-r align-middle">実績</TableHead>
                                        <TableHead className="text-center bg-white border-r align-middle">予定</TableHead>
                                        <TableHead className="text-center bg-white border-r align-middle">実績</TableHead>
                                        <TableHead className="text-center bg-white border-r align-middle">予定</TableHead>
                                        <TableHead className="text-center bg-white align-middle">実績</TableHead>
                                    </TableRow>
                                </TableHeader>
                            </Table>
                            <div
                                ref={fixedBodyRef}
                                onScroll={handleFixedScroll}
                                className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <Table className="w-full border-collapse">
                                    <TableBody>
                                        {tasks.map((task) => {
                                            const driverName = getDriverName(task.driverId);
                                            const isUnassigned = !task.driverId;

                                            return (
                                                <TableRow key={task.id} className="h-[50px] text-[16px]">
                                                    <TableCell className="text-center align-middle w-[112px]">{task.groupName}</TableCell>
                                                    <TableCell className="text-center align-middle w-[95px]">{task.taskId}</TableCell>
                                                    <TableCell className={`text-center align-middle w-[112px] ${isUnassigned ? 'bg-[#6B7280]' : 'bg-[#E3F2FD]'}`}>
                                                        <span
                                                            className={`cursor-pointer hover:text-blue-600 hover:underline font-medium transition-colors ${isUnassigned ? 'text-white' : ''
                                                                }`}
                                                            onClick={() => onDriverClick?.(task)}
                                                        >
                                                            {driverName}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className={`text-center align-middle w-[112px] ${!task.vehicleId ? 'bg-[#6B7280] text-white' : 'bg-[#E3F2FD] text-gray-600'}`}>
                                                        {getVehicleCode(task.vehicleId)}
                                                    </TableCell>
                                                    <TableCell className="text-center align-middle w-[64px]">{task.startTime}</TableCell>
                                                    <TableCell className="text-center align-middle bg-gray-50 w-[63px]"></TableCell>
                                                    <TableCell className="text-center align-middle w-[64px]">{task.endTime}</TableCell>
                                                    <TableCell className="text-center align-middle bg-gray-50 w-[63px]"></TableCell>
                                                    <TableCell className="text-center align-middle w-[64px]">{task.destinationTime}</TableCell>
                                                    <TableCell className="text-center align-middle bg-gray-50 w-[63px]"></TableCell>
                                                    <TableCell className="text-center align-middle w-[64px]">{task.returnTime}</TableCell>
                                                    <TableCell className="text-center align-middle bg-gray-50 w-[63px]"></TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col overflow-hidden">
                            <div
                                ref={scrollContainerRef}
                                onScroll={handleHeaderScroll}
                                className="shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                <div className="inline-block min-w-full align-top">
                                    <Table className="w-max border-collapse" style={{ tableLayout: 'fixed' }}>
                                        <TableHeader>
                                            <TableRow className="border-b bg-gray-100 hover:bg-gray-100" style={{ height: '24px' }}>
                                                {HOURS.map(hour => (
                                                    <TableHead
                                                        key={hour}
                                                        className="px-0 py-0 text-xs border-r text-center bg-gray-100 align-middle p-0"
                                                        style={{ minWidth: `${HOUR_WIDTH}px`, width: `${HOUR_WIDTH}px`, height: '24px', lineHeight: '24px' }}
                                                    >
                                                        {hour}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                            <TableRow className="border-b bg-gray-100 hover:bg-gray-100" style={{ height: '25px' }}>
                                                {HOURS.map(hour => (
                                                    <TableHead
                                                        key={`sub-${hour}`}
                                                        className="px-0 py-0 text-xs border-r text-center bg-gray-100 align-middle p-0"
                                                        style={{ minWidth: `${HOUR_WIDTH}px`, width: `${HOUR_WIDTH}px`, height: '26px', lineHeight: '25px' }}
                                                    >
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                    </Table>
                                </div>
                            </div>

                            <div
                                ref={scrollableBodyRef}
                                onScroll={handleScrollableScroll}
                                className="flex-1 overflow-auto"
                            >
                                <div className="inline-block min-w-full align-top">
                                    <Table className="w-max border-collapse" style={{ tableLayout: 'fixed' }}>
                                        <TableBody>
                                            {tasks.map((task, rowIndex) => {
                                                const slots = task.timeSlots || [task];

                                                return (
                                                    <TableRow
                                                        key={task.id}
                                                        className="h-[50px] border-b relative hover:bg-transparent"
                                                        onDrop={(e) => handleDrop(e, rowIndex)}
                                                        onDragOver={handleDragOver}
                                                    >
                                                        {HOURS.map(hour => {
                                                            const startingSlots = slots.filter(s => {
                                                                const [startH] = s.startTime.split(':').map(Number);
                                                                return startH === hour;
                                                            });

                                                            return (
                                                                <TableCell
                                                                    key={hour}
                                                                    className="border-r relative p-0"
                                                                    style={{
                                                                        minWidth: `${HOUR_WIDTH}px`,
                                                                        width: `${HOUR_WIDTH}px`,
                                                                    }}
                                                                >
                                                                    {startingSlots.map((slot, idx) => (
                                                                        <TimeSlotBar
                                                                            key={slot.id || `${task.id}-${hour}-${idx}`}
                                                                            slot={{
                                                                                ...task,
                                                                                ...slot,
                                                                                _parentId: task.id,
                                                                                _slotId: slot.id
                                                                            } as any}
                                                                            onDragStart={handleDragStart}
                                                                            onDragEnd={handleDragEnd}
                                                                        />
                                                                    ))}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TableWrapper >
        );
    }
);

HourlyScheduleTable.displayName = "HourlyScheduleTable";

export default HourlyScheduleTable;
