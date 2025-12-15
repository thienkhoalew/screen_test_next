"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";

export default function TableWrapper({
    title,
    children,
    className,
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("w-full flex flex-col", className)}>
            <div className="flex items-center justify-between mb-2 shrink-0">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

                <div className="flex items-center gap-0">
                    <Button variant="orange" className="rounded-r-none h-9 px-4 text-sm font-bold">日次勤務計画調整</Button>
                    <Button variant="gray" className="rounded-l-none h-9 px-4 text-sm font-bold">日次配車計画調整</Button>
                </div>
            </div>

            <div className="border rounded-xl p-2 bg-white shadow flex-1 min-h-0 flex flex-col overflow-hidden">
                {children}
            </div>
        </div>
    );
}
