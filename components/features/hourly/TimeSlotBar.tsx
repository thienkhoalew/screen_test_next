"use client";

import { cn } from "@/lib/utils";
import type { TimeSlot } from "../../../app/working/[id]/assign/hourly-schedule-table";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface TimeSlotBarProps {
    slot: TimeSlot;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, slot: TimeSlot) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

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

    const getTaskTypeLabel = (taskType?: "actual" | "delivery" | "charging") => {
        switch (taskType) {
            case "actual":
                return "実車";
            case "delivery":
                return "回送";
            case "charging":
                return "充電";
            default:
                return "実車";
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    draggable
                    onDragStart={(e) => onDragStart(e, slot)}
                    onDragEnd={onDragEnd}
                    className={cn(
                        "absolute top-1/2 -translate-y-1/2 h-8 rounded cursor-move transition-opacity hover:opacity-90",
                        getBarColor(slot.taskType)
                    )}
                    style={{
                        left: '2px',
                        width: `${slot.duration * 60 - 4}px`,
                        zIndex: 10
                    }}
                />
            </TooltipTrigger>
            <TooltipContent side="top" className="text-sm">
                <div className="space-y-1">
                    <div className="font-medium">{getTaskTypeLabel(slot.taskType)}</div>
                    <div className="text-xs text-slate-600">
                        開始時刻{slot.startTime} 終了時刻{slot.endTime}
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    );
}
