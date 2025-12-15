"use client";

import React, { useState, useRef } from "react";
import TableWrapper from "@/components/ui/table-wrapper";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DndContext, useDraggable, DragEndEvent } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

interface DraggableBarProps {
    id: string;
    bar: { start: number; end: number; color: string };
    totalHours: number;
    startHour: number;
}

function DraggableBar({ id, bar, totalHours, startHour }: DraggableBarProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const startOffset = ((bar.start - startHour) / totalHours) * 100;
    const width = ((bar.end - bar.start) / totalHours) * 100;

    const style: React.CSSProperties = {
        left: `${startOffset}%`,
        width: `${width}%`,
        transform: transform ? `translate3d(${transform.x}px, 0, 0)` : undefined,
        zIndex: transform ? 50 : "auto",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={cn(
                "absolute top-2 h-8 rounded shadow-sm opacity-90 cursor-move touch-none border border-black/10",
                bar.color
            )}
        />
    );
}

// Sample Data Initial State
const initialScheduleData = [
    {
        group: "Aグループ",
        id: "A-261",
        driver: "山田太郎",
        vehicle: "1234",
        startTime: { plan: "06:00", actual: "21:00" },
        endTime: { plan: "15:00", actual: "12:30" },
        bars: [{ start: 6, end: 10, color: "bg-[#FFC107]" }, { start: 13, end: 17, color: "bg-[#FFC107]" }, { start: 19, end: 22, color: "bg-[#FFC107]" }]
    },
    {
        group: "Aグループ",
        id: "A-262",
        driver: "伊藤二郎",
        vehicle: "2345",
        startTime: { plan: "06:00", actual: "22:00" },
        endTime: { plan: "17:00", actual: "14:00" },
        bars: [{ start: 6, end: 11, color: "bg-[#5B9BD5]" }, { start: 13, end: 15, color: "bg-[#5B9BD5]" }, { start: 19, end: 23, color: "bg-[#5B9BD5]" }]
    },
    {
        group: "Bグループ",
        id: "B-101",
        driver: "未割付",
        isUnassigned: true,
        vehicle: "3456",
        startTime: { plan: "07:00", actual: "20:00" },
        endTime: { plan: "13:00", actual: "10:30" },
        bars: [{ start: 7, end: 11, color: "bg-[#7CB342]" }, { start: 14, end: 17, color: "bg-[#7CB342]" }, { start: 19, end: 21, color: "bg-[#7CB342]" }]
    },
    {
        group: "Bグループ",
        id: "B-102",
        driver: "大田太郎",
        vehicle: "未割付",
        isVehicleUnassigned: true,
        startTime: { plan: "11:00", actual: "23:00" },
        endTime: { plan: "12:00", actual: "10:00" },
        bars: [{ start: 12, end: 18, color: "bg-[#C00000]" }, { start: 19, end: 23, color: "bg-[#C00000]" }]
    },
    {
        group: "Cグループ",
        id: "C-301",
        driver: "佐藤一郎",
        vehicle: "7890",
        startTime: { plan: "08:00", actual: "22:00" },
        endTime: { plan: "14:00", actual: "11:30" },
        bars: [{ start: 8, end: 13, color: "bg-[#ED7D31]" }, { start: 15, end: 18, color: "bg-[#ED7D31]" }, { start: 19, end: 22, color: "bg-[#ED7D31]" }]
    },
    {
        group: "Cグループ",
        id: "C-302",
        driver: "鈴木次郎",
        vehicle: "2468",
        startTime: { plan: "09:00", actual: "20:00" },
        endTime: { plan: "11:00", actual: "09:00" },
        bars: [{ start: 10, end: 13, color: "bg-[#A5A5A5]" }, { start: 14, end: 17, color: "bg-[#A5A5A5]" }]
    },
    {
        group: "Dグループ",
        id: "D-401",
        driver: "田中三郎",
        vehicle: "1357",
        startTime: { plan: "05:30", actual: "19:00" },
        endTime: { plan: "13:30", actual: "11:00" },
        bars: [{ start: 5.5, end: 10, color: "bg-[#4472C4]" }, { start: 11, end: 15, color: "bg-[#4472C4]" }, { start: 17, end: 20, color: "bg-[#4472C4]" }]
    },
    {
        group: "Dグループ",
        id: "D-402",
        driver: "高橋四郎",
        vehicle: "未割付",
        isVehicleUnassigned: true,
        startTime: { plan: "10:00", actual: "24:00" },
        endTime: { plan: "14:00", actual: "12:00" },
        bars: [{ start: 11, end: 17, color: "bg-[#7CB342]" }, { start: 18, end: 22, color: "bg-[#7CB342]" }, { start: 23, end: 25, color: "bg-[#7CB342]" }]
    },
];

const hours = Array.from({ length: 21 }, (_, i) => i + 5);
const TOTAL_HOURS = 20;
const START_HOUR = 5;

export default function ScheduleTable() {
    const [scheduleData, setScheduleData] = useState(initialScheduleData);
    const timelineContainerRef = useRef<HTMLDivElement>(null);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, delta } = event;
        if (!delta.x || !timelineContainerRef.current) return;

        const containerWidth = timelineContainerRef.current.offsetWidth;
        const hoursPerPixel = TOTAL_HOURS / containerWidth;
        const movedHours = delta.x * hoursPerPixel;

        const [rowIndexStr, barIndexStr] = (active.id as string).split("-");
        const rowIndex = parseInt(rowIndexStr);
        const barIndex = parseInt(barIndexStr);

        setScheduleData((prev) => {
            const newData = [...prev];
            const newRow = { ...newData[rowIndex] };
            const newBars = [...newRow.bars];
            const bar = newBars[barIndex];

            let newStart = bar.start + movedHours;
            let newEnd = bar.end + movedHours;
            const duration = bar.end - bar.start;

            if (newStart < START_HOUR) {
                newStart = START_HOUR;
                newEnd = newStart + duration;
            }
            if (newEnd > START_HOUR + TOTAL_HOURS) {
                newEnd = START_HOUR + TOTAL_HOURS;
                newStart = newEnd - duration;
            }

            newBars[barIndex] = { ...bar, start: newStart, end: newEnd };
            newRow.bars = newBars;
            newData[rowIndex] = newRow;

            return newData;
        });
    };

    return (
        <TableWrapper title="" className="h-full">
            <DndContext modifiers={[restrictToHorizontalAxis]} onDragEnd={handleDragEnd}>
                <div className="p-2 border-b flex gap-2 items-center bg-white">
                    <Button variant="secondary" className="h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 shadow-sm rounded">分割</Button>
                    <Button variant="secondary" className="h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 shadow-sm rounded">圧縮</Button>
                    <Button variant="secondary" className="h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300 shadow-sm rounded">回送設定</Button>

                    <div className="ml-4 border rounded px-2 py-1 flex items-center gap-2 bg-white min-w-[150px] justify-between h-8 text-sm text-gray-700 hover:border-gray-400 cursor-pointer">
                        <span>絞り込み</span>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                </div>

                <div className="flex-1 overflow-auto">
                    <Table className="border-collapse w-full min-w-[1200px]">
                        <TableHeader className="bg-gray-50/50 sticky top-0 z-10">
                            <TableRow className="border-b-gray-200">
                                <TableHead rowSpan={2} className="border bg-gray-100 font-bold text-gray-700 text-center w-[100px]">勤務グループ</TableHead>
                                <TableHead rowSpan={2} className="border bg-gray-100 font-bold text-gray-700 text-center w-[80px]">仕業ID</TableHead>
                                <TableHead rowSpan={2} className="border bg-gray-100 font-bold text-gray-700 text-center w-[100px]">運転手</TableHead>
                                <TableHead rowSpan={2} className="border bg-gray-100 font-bold text-gray-700 text-center w-[80px]">車両</TableHead>
                                <TableHead colSpan={2} className="border bg-gray-100 font-bold text-gray-700 text-center h-8">勤務開始時刻</TableHead>
                                <TableHead colSpan={2} className="border bg-gray-100 font-bold text-gray-700 text-center h-8">勤務終了時刻</TableHead>
                                <TableHead colSpan={2} className="border bg-gray-100 font-bold text-gray-700 text-center h-8">拘束時間</TableHead>
                                <TableHead colSpan={2} className="border bg-gray-100 font-bold text-gray-700 text-center h-8">ハンドル時間</TableHead>
                                {hours.map((h) => (
                                    <TableHead key={h} rowSpan={2} className="border bg-white text-xs text-center p-0 font-normal min-w-[40px] relative">
                                        <span className="absolute top-1 left-1">{h}</span>
                                    </TableHead>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableHead className="border bg-gray-100 font-bold text-gray-700 text-center text-xs h-8 w-[60px]">予定</TableHead>
                                <TableHead className="border bg-gray-100 font-bold text-gray-700 text-center text-xs h-8 w-[60px]">実績</TableHead>
                                <TableHead className="border bg-gray-100 font-bold text-gray-700 text-center text-xs h-8 w-[60px]">予定</TableHead>
                                <TableHead className="border bg-gray-100 font-bold text-gray-700 text-center text-xs h-8 w-[60px]">実績</TableHead>
                                <TableHead className="border bg-gray-100 font-bold text-gray-700 text-center text-xs h-8 w-[60px]">予定</TableHead>
                                <TableHead className="border bg-gray-100 font-bold text-gray-700 text-center text-xs h-8 w-[60px]">実績</TableHead>
                                <TableHead className="border bg-gray-100 font-bold text-gray-700 text-center text-xs h-8 w-[60px]">予定</TableHead>
                                <TableHead className="border bg-gray-100 font-bold text-gray-700 text-center text-xs h-8 w-[60px]">実績</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scheduleData.map((row, rowIndex) => (
                                <TableRow key={rowIndex} className="hover:bg-transparent">
                                    <TableCell className="border text-center text-xs py-1 h-10 bg-gray-50">{row.group}</TableCell>
                                    <TableCell className="border text-center text-xs">{row.id}</TableCell>
                                    <TableCell className={cn("border text-center text-xs", row.isUnassigned ? "bg-gray-500 text-white" : "")}>
                                        {row.driver}
                                    </TableCell>
                                    <TableCell className={cn("border text-center text-xs", row.isVehicleUnassigned ? "bg-gray-500 text-white" : "")}>
                                        {row.vehicle}
                                    </TableCell>
                                    <TableCell className="border text-center text-xs">{row.startTime.plan}</TableCell>
                                    <TableCell className="border text-center text-xs">{row.startTime.actual}</TableCell>
                                    <TableCell className="border text-center text-xs">{row.endTime.plan}</TableCell>
                                    <TableCell className="border text-center text-xs">{row.endTime.actual}</TableCell>
                                    <TableCell className="border text-center text-xs">15:00</TableCell>
                                    <TableCell className="border text-center text-xs">12:30</TableCell>
                                    <TableCell className="border text-center text-xs">12:30</TableCell>
                                    <TableCell className="border text-center text-xs"></TableCell>

                                    {/* Timeline Cells */}
                                    <TableCell
                                        colSpan={21}
                                        className="p-0 border relative h-10 bg-white align-top"
                                    >
                                        <div
                                            ref={rowIndex === 0 ? timelineContainerRef : undefined}
                                            className="relative w-full h-full flex"
                                        >
                                            {hours.map((h, i) => (
                                                <div key={i} className="flex-1 border-r h-full border-gray-100 last:border-r-0"></div>
                                            ))}

                                            {row.bars.map((bar, barIndex) => (
                                                <DraggableBar
                                                    key={barIndex}
                                                    id={`${rowIndex}-${barIndex}`}
                                                    bar={bar}
                                                    totalHours={TOTAL_HOURS}
                                                    startHour={START_HOUR}
                                                />
                                            ))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DndContext>
        </TableWrapper>
    );
}