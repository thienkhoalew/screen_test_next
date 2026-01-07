"use client";

import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { useState } from "react";

export type TableViewMode = "work-schedule" | "vehicle-schedule";

interface TableWrapperProps {
    title: React.ReactNode;
    children: React.ReactNode | ((viewMode: TableViewMode) => React.ReactNode);
    className?: string;
    defaultViewMode?: TableViewMode;
    onViewModeChange?: (mode: TableViewMode) => void;
}

export default function TableWrapper({
    title,
    children,
    className,
    defaultViewMode = "work-schedule",
    onViewModeChange,
}: TableWrapperProps) {
    const [viewMode, setViewMode] = useState<TableViewMode>(defaultViewMode);

    const handleViewModeChange = (mode: TableViewMode) => {
        setViewMode(mode);
        onViewModeChange?.(mode);
    };

    return (
        <div className={cn("w-full flex flex-col", className)}>
            <div className="flex items-center justify-between mb-2 shrink-0">
                <div className="flex items-center">
                    {title}
                </div>

                <div className="flex items-center gap-0">
                    <Button
                        variant={viewMode === "work-schedule" ? "orange" : "gray"}
                        onClick={() => handleViewModeChange("work-schedule")}
                        className="rounded-r-none"
                    >
                        勤務計画表
                    </Button>
                    <Button
                        variant={viewMode === "vehicle-schedule" ? "orange" : "gray"}
                        onClick={() => handleViewModeChange("vehicle-schedule")}
                        className="rounded-l-none"
                    >
                        配車計画表
                    </Button>
                </div>
            </div>

            <div className="bg-white flex-1 min-h-0 flex flex-col overflow-hidden">
                {typeof children === "function" ? children(viewMode) : children}
            </div>
        </div>
    );
}
