"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import DriverCard, { DriverInfo } from "./driver-card";
import { HistoryPanel } from "../components/HistoryPanel";
import { Input } from "@/components/ui/input";

interface DriverCategory {
    title: string;
    headerColor: string;
    drivers: DriverInfo[];
}

interface DriverListSectionProps {
    className?: string;
    driverCategories: DriverCategory[];
    historyLogs: { timestamp: string; message: string }[];
    onReset: () => void;
}

export default function DriverListSection({ className, driverCategories, historyLogs, onReset }: DriverListSectionProps) {
    const totalDrivers = driverCategories.reduce((sum, cat) => sum + cat.drivers.length, 0);

    return (
        <div className="flex flex-col h-full border rounded-lg bg-gray-50/30 overflow-hidden shadow-sm">
            <div className="flex flex-1 min-h-0">
                <div className="flex-1 flex flex-col min-w-0 p-2 gap-2">
                    <div className="flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2 text-[32px] ">
                            <h3 className="text-gray-800">割付可能運転手一覧</h3>
                        </div>
                    </div>

                    <div className="shrink-0 w-[80%]">
                        <div className="flex flex-col gap-1">
                            <label className="text-[20px] text-gray-700">仕業ID</label>
                            <Input
                                type="text"
                                placeholder="仕業を選択"
                                className="h-8 text-sm w-[200px]"
                            />
                        </div>
                    </div>

                    <div className="flex-1 flex gap-2 min-h-0 overflow-x-auto">
                        {driverCategories.map((cat, index) => (
                            <Card key={index} className="w-[218px] shrink-0 flex flex-col h-full overflow-hidden rounded-lg border-gray-200 p-0 gap-0">
                                <div className={cn("h-[42px] flex items-center justify-center px-3 text-sm font-bold text-gray-700", cat.headerColor)}>
                                    <div>
                                        {cat.title}
                                        <span className="text-xs font-normal text-gray-600">({cat.drivers.length})</span>
                                    </div>
                                </div>
                                <ScrollArea className="flex-1 h-0 bg-white">
                                    <div className="space-y-1 p-1">
                                        {cat.drivers.map((driver, dIndex) => (
                                            <DriverCard
                                                key={dIndex}
                                                driver={driver}
                                            />
                                        ))}
                                    </div>
                                </ScrollArea>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="w-[550px] shrink-0">
                    <HistoryPanel logs={historyLogs} onReset={onReset} />
                </div>
            </div>
        </div>
    );
}
