import { DailyStatus } from "@/types";
import { TaskCard } from "@/components/shared/cards/TaskCard";
import { Draggable, Droppable } from "@/components/shared/dnd/DndWrapper";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ComponentType } from "react";

export interface StatusCellProps {
    status: DailyStatus | DailyStatus[];
    day: number;
    driverId: string;
    unassignedTasks?: DailyStatus[];
    onStatusChange?: (driverId: string, day: number, newStatus: DailyStatus | DailyStatus[]) => void;
    onTaskAssigned?: (day: number, task: DailyStatus, driverId?: string) => void;
    isAssistant?: boolean;
    showContextMenu?: boolean;
    showPopover?: boolean;
    AssistantTaskAlert?: ComponentType<{ code: string; value: string }>;
}

export const StatusCell = ({
    status,
    day,
    driverId,
    unassignedTasks = [],
    onStatusChange,
    onTaskAssigned,
    showContextMenu = false,
    showPopover = false,
    AssistantTaskAlert,
}: StatusCellProps) => {
    const dropId = `cell-${driverId}-${day}`;

    const handleStatusUpdate = (type: string, statusText: string = "") => {
        if (!onStatusChange) return;
        if (type === "remove") {
            onStatusChange(driverId, day, null);
        } else {
            onStatusChange(driverId, day, {
                type,
                statusText,
                code: "",
                value: "",
            });
        }
    };

    const handleSlotAssignment = (index: number, task: DailyStatus) => {
        if (!onStatusChange) return;

        const currentStatusList = Array.isArray(status) ? [...status] : (status ? [status] : []);

        const isAssistantSlot = currentStatusList.some(s => s && s.type === "assistant");

        const newTask: DailyStatus = {
            ...task,
            type: isAssistantSlot ? "assistant" : "work"
        };

        if (index >= 0 && index < currentStatusList.length) {
            currentStatusList[index] = newTask;
        } else {
            currentStatusList.push(newTask);
        }

        onStatusChange(driverId, day, currentStatusList);
        if (onTaskAssigned) {
            onTaskAssigned(day, task, driverId);
        }
    };

    const cellContent = (() => {
        const statusList = Array.isArray(status) ? status : (status ? [status] : []);
        if (statusList.length === 0) return <div className="h-full w-full"></div>;

        const hasAssistant = statusList.some(s => s && s.type === "assistant");

        const renderVisuals = () => (
            <div className="flex flex-col gap-0.5 items-center justify-center w-full h-full p-0.5">
                {statusList.map((s, idx) => {
                    if (!s) return null;
                    if (s.type === "assistant") {
                        if (!s.code || s.code === "") {
                            // Empty assistant slot - show popover if enabled
                            if (showPopover) {
                                return (
                                    <Popover key={idx}>
                                        <PopoverTrigger asChild>
                                            <div className="cursor-grab active:cursor-grabbing w-full">
                                                <TaskCard
                                                    code=""
                                                    value=""
                                                    hideValue={true}
                                                    className="w-[80%] mx-auto bg-[#FFCCCC] hover:bg-red-300 border border-[#FFCCCC] rounded-[4px] h-[19px] shadow-sm gap-0 py-0"
                                                />
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-1" align="start" side="bottom">
                                            <div className="flex flex-col max-h-80 overflow-y-auto">
                                                {unassignedTasks.length > 0 ? unassignedTasks.filter(t => t !== null).map((task, tIdx) => (
                                                    <div
                                                        key={tIdx}
                                                        className="flex items-center gap-4 p-2 hover:bg-blue-50 cursor-pointer text-sm transition-colors rounded-sm whitespace-nowrap text-gray-700"
                                                        onClick={() => handleSlotAssignment(idx, task!)}
                                                    >
                                                        <span className="font-bold text-base min-w-[60px]">{task!.code}</span>
                                                        <span>出勤時刻{task!.startTime}</span>
                                                        <span>退勤時刻{task!.endTime}</span>
                                                        <span>拘束時間{task!.constraintTime}</span>
                                                        <span>走行距離{task!.distance}</span>
                                                    </div>
                                                )) : (
                                                    <div className="p-4 text-sm text-gray-500 text-center">割付可能な作業はありません</div>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                );
                            } else {
                                // No popover - just show empty assistant card
                                return (
                                    <div key={idx} className="cursor-grab active:cursor-grabbing w-full">
                                        <TaskCard
                                            code=""
                                            value=""
                                            hideValue={true}
                                            className="w-[80%] mx-auto bg-[#FFCCCC] hover:bg-red-300 border border-[#FFCCCC] rounded-[4px] h-[19px] shadow-sm gap-0 py-0"
                                        />
                                    </div>
                                );
                            }
                        } else {
                            // Assigned assistant task - show alert if component provided
                            if (AssistantTaskAlert) {
                                return <AssistantTaskAlert key={idx} code={s.code || ""} value={s.value || ""} />;
                            } else {
                                return (
                                    <div key={idx} className="w-full cursor-grab active:cursor-grabbing">
                                        <TaskCard
                                            code={s.code || ""}
                                            value={s.value || ""}
                                            hideValue={true}
                                            className="w-[80%] mx-auto bg-[#F3F4F6] border border-gray-200 rounded-[4px] h-[19px] shadow-sm gap-0 py-0"
                                        />
                                    </div>
                                );
                            }
                        }
                    } else if (s.type === "work") {
                        return (
                            <div key={idx} className="w-full">
                                <TaskCard code={s.code || ""} value={s.value || ""} hideValue={false} />
                            </div>
                        );
                    } else if (s.type === "holiday") {
                        return <div key={idx} className="flex h-[22px] w-[26px] items-center justify-center rounded-lg bg-[#DBEAFE] border border-[#BEDBFF] text-[#193CB8] mx-auto">{s.statusText}</div>;
                    } else if (s.type === "paid") {
                        return <div key={idx} className="flex h-[22px] w-[26px] items-center justify-center rounded-lg bg-[#F3E8FE] border border-[#DFC9F1] text-[#8A4FBC] mx-auto">{s.statusText}</div>;
                    } else if (s.type === "unknown") {
                        return <div key={idx} className="flex h-[22px] w-[26px] items-center justify-center rounded-lg bg-[#FEF9C2] border border-[#FFF085] text-[#894B00] mx-auto">{s.statusText}</div>;
                    } else if (s.type === "unavailable") {
                        return <div key={idx} className="flex h-[22px] w-[26px] items-center justify-center rounded-lg bg-[#E1A9A8] border border-[#FEE1E1] text-[#9A2422] mx-auto">{s.statusText}</div>;
                    } else if (s.type === "help") {
                        return <div key={idx} className="h-full w-full flex items-center justify-center text-[10px] text-white bg-[#666D78]">{s.statusText}</div>;
                    }
                    return null;
                })}
            </div>
        );

        const hasInfo = statusList.some(s => s && s.code);
        const tooltipContent = hasInfo ? (
            <div className="flex flex-col gap-2">
                {statusList.map((s, idx) => {
                    if (!s || !s.code) return null;
                    return (
                        <div key={idx} className="border-b last:border-b-0 pb-1 last:pb-0 border-gray-500/30">
                            <p className="font-bold">{s.code}</p>
                            <p className="text-xs">出勤時間 {s.startTime || "08:00"} 退勤時間 {s.endTime || "17:00"}</p>
                            <p className="text-xs">拘束時間 {s.constraintTime || "9:00"} 走行距離 {s.distance || "50km"}</p>
                        </div>
                    )
                })}
            </div>
        ) : null;

        let content = renderVisuals();

        if (tooltipContent) {
            content = (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="cursor-pointer h-full w-full">
                            {content}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        {tooltipContent}
                    </TooltipContent>
                </Tooltip>
            );
        }

        const canDrag = !hasAssistant && statusList.some(s => s && s.type === "work");

        if (canDrag) {
            content = (
                <Draggable id={`assigned-${driverId}-${day}`} data={status} className="h-full w-full flex items-center justify-center">
                    {content}
                </Draggable>
            );
        }

        // Wrap with context menu if enabled
        if (showContextMenu && onStatusChange) {
            return (
                <ContextMenu>
                    <ContextMenuTrigger className="h-full w-full flex items-center justify-center">
                        {content}
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem onClick={() => handleStatusUpdate("remove")}>割付解除</ContextMenuItem>
                        <ContextMenuItem onClick={() => handleStatusUpdate("holiday", "公")}>公休</ContextMenuItem>
                        <ContextMenuItem onClick={() => handleStatusUpdate("paid", "有")}>有休</ContextMenuItem>
                        <ContextMenuItem onClick={() => handleStatusUpdate("unknown", "予")}>予備ダイヤ</ContextMenuItem>
                        <ContextMenuItem onClick={() => handleStatusUpdate("unavailable", "不")}>乗務不可</ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            );
        }

        return content;
    })();

    return (
        <Droppable id={dropId}>
            {cellContent}
        </Droppable>
    );
};
