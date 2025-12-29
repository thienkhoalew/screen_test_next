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
} from "@/components/ui/table";

// Types
export interface TimeSlot {
    id: string;
    groupName: string;
    taskId: string;
    driverName: string;
    startTime: string;
    endTime: string;
    destinationTime: string;
    returnTime: string;
    startHour: number;
    duration: number;
    status: "assigned" | "unassigned" | "completed";
    taskType?: "actual" | "delivery" | "charging"; // 実車 | 回送 | 充電
}

interface HourlyScheduleTableProps {
    className?: string;
    onTimeSlotChange?: (slot: TimeSlot, oldStartTime: string, newStartTime: string, newEndTime: string) => void;
}

export interface HourlyScheduleTableRef {
    getScheduleData: () => {
        timeSlots: TimeSlot[];
    };
}

// Mock data
const initialTimeSlots: TimeSlot[] = [
    {
        id: "1",
        groupName: "Aグループ",
        taskId: "A-261",
        driverName: "山口未来",
        startTime: "12:00",
        endTime: "21:00",
        destinationTime: "15:00",
        returnTime: "12:30",
        startHour: 12,
        duration: 9,
        status: "assigned",
        taskType: "actual",
    },
    {
        id: "2",
        groupName: "Aグループ",
        taskId: "A-261",
        driverName: "田中太郎",
        startTime: "06:00",
        endTime: "10:00",
        destinationTime: "17:00",
        returnTime: "14:00",
        startHour: 6,
        duration: 4,
        status: "assigned",
        taskType: "actual",
    },
    {
        id: "3",
        groupName: "Bグループ",
        taskId: "B-102",
        driverName: "木村太郎",
        startTime: "11:00",
        endTime: "23:00",
        destinationTime: "20:00",
        returnTime: "10:30",
        startHour: 11,
        duration: 12,
        status: "assigned",
        taskType: "actual",
    },
    {
        id: "4",
        groupName: "Bグループ",
        taskId: "B-102",
        driverName: "木田太郎",
        startTime: "運行1",
        endTime: "23:00",
        destinationTime: "11:00",
        returnTime: "10:40",
        startHour: 8,
        duration: 3,
        status: "unassigned",
        taskType: "delivery",
    },
    {
        id: "5",
        groupName: "Cグループ",
        taskId: "C-301",
        driverName: "松星一郎",
        startTime: "00:00",
        endTime: "14:00",
        destinationTime: "14:00",
        returnTime: "11:30",
        startHour: 0,
        duration: 14,
        status: "assigned",
        taskType: "actual",
    },
    {
        id: "6",
        groupName: "Cグループ",
        taskId: "C-302",
        driverName: "佐藤次郎",
        startTime: "08:00",
        endTime: "20:00",
        destinationTime: "11:00",
        returnTime: "09:30",
        startHour: 8,
        duration: 12,
        status: "assigned",
        taskType: "charging",
    },
    {
        id: "7",
        groupName: "Dグループ",
        taskId: "D-401",
        driverName: "田中正志",
        startTime: "10:00",
        endTime: "00:00",
        destinationTime: "14:00",
        returnTime: "12:00",
        startHour: 10,
        duration: 14,
        status: "assigned",
        taskType: "actual",
    },
    {
        id: "8",
        groupName: "Dグループ",
        taskId: "D-402",
        driverName: "東根定志",
        startTime: "運行1",
        endTime: "24:00",
        destinationTime: "14:00",
        returnTime: "12:00",
        startHour: 3,
        duration: 7,
        status: "unassigned",
        taskType: "delivery",
    },
];

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function hourToTimeString(hour: number, minute: number = 0): string {
    const h = hour % 24;
    return `${String(h).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function parseTimeString(timeStr: string): { hour: number; minute: number } | null {
    if (!timeStr.match(/^\d{1,2}:\d{2}$/)) {
        return null;
    }
    const [hourStr, minuteStr] = timeStr.split(':');
    return {
        hour: parseInt(hourStr, 10),
        minute: parseInt(minuteStr, 10)
    };
}

function calculateEndTime(startHour: number, duration: number): string {
    const endHour = (startHour + duration) % 24;
    return hourToTimeString(endHour);
}

function initializeTimeSlot(slot: TimeSlot): TimeSlot {
    const parsedStart = parseTimeString(slot.startTime);

    if (!parsedStart) {
        return slot;
    }

    const parsedEnd = parseTimeString(slot.endTime);
    if (!parsedEnd) {
        return { ...slot, startHour: parsedStart.hour };
    }

    let duration = parsedEnd.hour - parsedStart.hour;
    if (duration < 0) {
        duration += 24;
    }

    return {
        ...slot,
        startHour: parsedStart.hour,
        duration: duration
    };
}

const HourlyScheduleTable = forwardRef<HourlyScheduleTableRef, HourlyScheduleTableProps>(
    ({ className, onTimeSlotChange }, ref) => {
        const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
            initialTimeSlots.map(slot => initializeTimeSlot(slot))
        );
        const [draggedSlot, setDraggedSlot] = useState<TimeSlot | null>(null);
        const [dragOffset, setDragOffset] = useState(0);
        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const fixedBodyRef = useRef<HTMLDivElement>(null);
        const scrollableBodyRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            getScheduleData: () => ({
                timeSlots
            })
        }));

        const handleFixedScroll = () => {
            if (fixedBodyRef.current && scrollableBodyRef.current) {
                scrollableBodyRef.current.scrollTop = fixedBodyRef.current.scrollTop;
            }
        };

        const handleScrollableScroll = () => {
            if (fixedBodyRef.current && scrollableBodyRef.current) {
                fixedBodyRef.current.scrollTop = scrollableBodyRef.current.scrollTop;
            }
        };

        const handleDragStart = (e: React.DragEvent<HTMLDivElement>, slot: TimeSlot) => {
            setDraggedSlot(slot);
            const rect = e.currentTarget.getBoundingClientRect();
            setDragOffset(e.clientX - rect.left);
            e.currentTarget.style.opacity = "0.5";
        };

        const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
            e.currentTarget.style.opacity = "1";
            setDraggedSlot(null);
        };

        const handleDrop = (e: React.DragEvent<HTMLDivElement>, rowIndex: number) => {
            e.preventDefault();
            if (!draggedSlot) return;

            const scrollContainer = scrollContainerRef.current;
            if (!scrollContainer) return;

            const containerRect = scrollContainer.getBoundingClientRect();
            const cellWidth = 60;
            const scrollLeft = scrollContainer.scrollLeft;

            const relativeX = e.clientX - containerRect.left + scrollLeft - dragOffset;
            const hourIndex = Math.floor(relativeX / cellWidth);

            // Giới hạn startHour để thanh không vượt quá 24 giờ
            // Tính toán: startHour + duration không được vượt quá 24
            const maxStartHour = 24 - draggedSlot.duration;
            const newStartHour = Math.max(0, Math.min(maxStartHour, hourIndex));

            const slotIndex = timeSlots.findIndex(s => s.id === draggedSlot.id);
            if (slotIndex !== rowIndex) return;

            const newStartTime = hourToTimeString(newStartHour);
            const newEndTime = calculateEndTime(newStartHour, draggedSlot.duration);

            if (onTimeSlotChange) {
                onTimeSlotChange(draggedSlot, draggedSlot.startTime, newStartTime, newEndTime);
            }

            setTimeSlots(prev => prev.map(slot =>
                slot.id === draggedSlot.id
                    ? {
                        ...slot,
                        startHour: newStartHour,
                        startTime: newStartTime,
                        endTime: newEndTime
                    }
                    : slot
            ));
        };

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
        };

        return (
            <TableWrapper title="" className={className}>
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b shrink-0">
                        <div className="flex gap-2">
                            <Button variant="grayBordered" size="sm">分割</Button>
                            <Button variant="grayBordered" size="sm">任意</Button>
                            <Button variant="grayBordered" size="sm">回送設定</Button   >
                        </div>
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-6 rounded bg-[#2B7FFF]"></div>
                                <span>実車</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-6 rounded bg-[#9EC5FF]"></div>
                                <span>回送</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-12 h-6 rounded bg-[#7CB342]"></div>
                                <span>充電</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 min-h-0 overflow-hidden">
                        <div className="shrink-0 border-r bg-gray-50 flex flex-col">
                            <table className="w-full border-collapse">
                                <TableHeader>
                                    <TableRow className="h-12 border-b bg-gray-100 hover:bg-gray-100">
                                        <TableHead className="px-3 py-2 text-left text-xs font-semibold w-24">編成グループ</TableHead>
                                        <TableHead className="px-3 py-2 text-left text-xs font-semibold w-20">仕業<br />番号</TableHead>
                                        <TableHead className="px-3 py-2 text-left text-xs font-semibold w-24">運転手</TableHead>
                                        <TableHead className="px-3 py-2 text-left text-xs font-semibold w-16">出庫</TableHead>
                                        <TableHead className="px-3 py-2 text-left text-xs font-semibold w-16">帰庫</TableHead>
                                        <TableHead className="px-3 py-2 text-left text-xs font-semibold w-16">現着</TableHead>
                                        <TableHead className="px-3 py-2 text-left text-xs font-semibold w-16">帰社</TableHead>
                                    </TableRow>
                                </TableHeader>
                            </table>
                            <div
                                ref={fixedBodyRef}
                                onScroll={handleFixedScroll}
                                className="flex-1 overflow-y-auto overflow-x-hidden"
                            >
                                <table className="w-full border-collapse">
                                    <TableBody>
                                        {timeSlots.map((slot) => (
                                            <TableRow key={slot.id} className="h-12">
                                                <TableCell className="px-3 py-2 text-xs w-24">{slot.groupName}</TableCell>
                                                <TableCell className="px-3 py-2 text-xs w-20">{slot.taskId}</TableCell>
                                                <TableCell className="px-3 py-2 text-xs w-24">{slot.driverName}</TableCell>
                                                <TableCell className="px-3 py-2 text-xs w-16">{slot.startTime}</TableCell>
                                                <TableCell className="px-3 py-2 text-xs w-16">{slot.endTime}</TableCell>
                                                <TableCell className="px-3 py-2 text-xs w-16">{slot.destinationTime}</TableCell>
                                                <TableCell className="px-3 py-2 text-xs w-16">{slot.returnTime}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </table>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col overflow-hidden">
                            <div
                                ref={scrollableBodyRef}
                                onScroll={handleScrollableScroll}
                                className="flex-1 overflow-auto"
                            >
                                <div ref={scrollContainerRef} className="inline-block min-w-full">
                                    <table className="w-full border-collapse">
                                        <TableHeader>
                                            <TableRow className="h-12 border-b bg-gray-100 hover:bg-gray-100">
                                                {HOURS.map(hour => (
                                                    <TableHead
                                                        key={hour}
                                                        className="px-0 py-2 text-xs font-semibold border-r text-center sticky top-0 bg-gray-100 z-20"
                                                        style={{ minWidth: '60px', width: '60px' }}
                                                    >
                                                        {hour}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {timeSlots.map((slot, rowIndex) => (
                                                <TableRow
                                                    key={slot.id}
                                                    className="h-12 border-b relative hover:bg-transparent"
                                                    onDrop={(e) => handleDrop(e, rowIndex)}
                                                    onDragOver={handleDragOver}
                                                >
                                                    {HOURS.map(hour => (
                                                        <TableCell
                                                            key={hour}
                                                            className="border-r relative p-0"
                                                            style={{
                                                                minWidth: '60px',
                                                                width: '60px',
                                                            }}
                                                        >
                                                            {hour === slot.startHour && (
                                                                <TimeSlotBar
                                                                    slot={slot}
                                                                    onDragStart={handleDragStart}
                                                                    onDragEnd={handleDragEnd}
                                                                />
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TableWrapper>
        );
    }
);

HourlyScheduleTable.displayName = "HourlyScheduleTable";

export default HourlyScheduleTable;
