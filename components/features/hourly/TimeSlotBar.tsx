"use client";

import { cn } from "@/lib/utils";
import type { DailyTask, TaskSegment } from "../../../app/working/[id]/assign/mockData";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface TimeSlotBarProps {
    slot: DailyTask;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, slot: DailyTask) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

const HOUR_WIDTH = 36;

export default function TimeSlotBar({ slot, onDragStart, onDragEnd }: TimeSlotBarProps) {
    const getBarColor = (taskType?: "actual" | "delivery" | "charging") => {
        switch (taskType) {
            case "actual":
                return "bg-[#2B7FFF]";
            case "delivery":
                return "bg-[#9EC5FF]";
            case "charging":
                return "bg-[#7CB342]";
            default:
                return "bg-[#2B7FFF]";
        }
    };

    const addMinutes = (timeStr: string, minutesToAdd: number): string => {
        const [h, m] = timeStr.split(':').map(Number);
        const totalMinutes = h * 60 + m + minutesToAdd;
        const newH = Math.floor(totalMinutes / 60) % 24;
        const newM = totalMinutes % 60;
        return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
    };

    const [startH, startM] = slot.startTime.split(':').map(Number);
    const leftOffset = (startM / 60) * HOUR_WIDTH;

    const [endH, endM] = slot.endTime.split(':').map(Number);
    let durationMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    if (durationMinutes < 0) {
        durationMinutes += 24 * 60;
    }
    if (durationMinutes <= 0) {
        durationMinutes = slot.duration * 60;
    }

    const width = (durationMinutes / 60) * HOUR_WIDTH - 4;

    const renderTooltipContent = (type: "actual" | "delivery" | "charging", startTime: string, endTime: string) => {
        if (type === "charging") return null;

        if (type === "delivery") {
            return (
                <div className="space-y-1">
                    <div className="font-medium">回送</div>
                    <div className="text-xs text-slate-600">
                        開始時刻{startTime} 終了時刻{endTime}
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-1">
                <div className="font-medium">
                    仕業名 : {slot.taskId} &nbsp; 便名 : {slot.tripNumber || "----"}
                </div>
                <div className="text-xs text-slate-600">
                    開始時刻{startTime} 終了時刻{endTime}
                </div>
            </div>
        );
    };

    const renderContent = () => {
        if (slot.segments && slot.segments.length > 0) {
            const totalSegmentDuration = slot.segments.reduce((acc, curr) => acc + curr.duration, 0);

            let currentStartTime = slot.startTime;

            return (
                <div className="flex w-full h-full rounded overflow-hidden">
                    {slot.segments.map((seg, idx) => {
                        const widthPercent = (seg.duration / totalSegmentDuration) * 100;
                        const segStartTime = currentStartTime;
                        const segEndTime = addMinutes(currentStartTime, seg.duration);
                        currentStartTime = segEndTime;

                        const tooltipContent = renderTooltipContent(seg.type, segStartTime, segEndTime);

                        if (!tooltipContent) {
                            return (
                                <div
                                    key={idx}
                                    className={cn(getBarColor(seg.type), "h-full hover:opacity-80 transition-opacity")}
                                    style={{ width: `${widthPercent}%` }}
                                />
                            );
                        }

                        return (
                            <Tooltip key={idx}>
                                <TooltipTrigger asChild>
                                    <div
                                        className={cn(getBarColor(seg.type), "h-full hover:opacity-80 transition-opacity")}
                                        style={{ width: `${widthPercent}%` }}
                                    />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-sm">
                                    {tooltipContent}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            );
        } else {
            const tooltipContent = renderTooltipContent(slot.taskType || "actual", slot.startTime, slot.endTime);

            if (!tooltipContent) {
                return (
                    <div className={cn("w-full h-full rounded hover:opacity-90 transition-opacity", getBarColor(slot.taskType))}></div>
                );
            }

            return (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className={cn("w-full h-full rounded hover:opacity-90 transition-opacity", getBarColor(slot.taskType))}></div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-sm">
                        {tooltipContent}
                    </TooltipContent>
                </Tooltip>
            );
        }
    };

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, slot)}
            onDragEnd={onDragEnd}
            className="absolute top-1/2 -translate-y-1/2 h-6 cursor-move pointer-events-auto"
            style={{
                left: `${leftOffset + 2}px`,
                width: `${Math.max(width, 4)}px`,
                zIndex: 10
            }}
        >
            {renderContent()}
        </div>
    );
}
