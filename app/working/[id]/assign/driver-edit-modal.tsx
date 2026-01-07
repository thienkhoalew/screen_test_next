"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DriverInfo } from "./driver-card";
import { StatusBadge, getStatusTypeFromValue, getDisplayLabelFromValue } from "@/components/shared/StatusBadge";
import { X, ChevronDown } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DriverCategory {
    title: string;
    headerColor: string;
    drivers: DriverInfo[];
}

interface DriverEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (selectedDriver: DriverInfo | null) => void;
    driverCategories: DriverCategory[];
    initialFilter?: string;
    currentDriver?: DriverInfo | null;
}

export default function DriverEditModal({
    open,
    onOpenChange,
    onSave,
    driverCategories = [],
    initialFilter = "",
    currentDriver = null,
}: DriverEditModalProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [filterValue, setFilterValue] = useState<string>(initialFilter);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (open) {
            setSelectedId(null);
            if (initialFilter) {
                setFilterValue(initialFilter);
            } else if (driverCategories.length > 0) {
                setFilterValue(driverCategories[0].title);
            }
        }
    }, [open, initialFilter, driverCategories]);

    useEffect(() => {
        setSelectedId(null);
    }, [filterValue]);

    const handleSave = () => {
        let selectedDriver: DriverInfo | null = null;
        for (const category of driverCategories) {
            const driver = category.drivers.find(d => d.name === selectedId);
            if (driver) {
                selectedDriver = driver;
                break;
            }
        }
        onSave(selectedDriver);
        onOpenChange(false);
    };

    const selectedCategory = driverCategories.find(cat => cat.title === filterValue);
    const displayDrivers = selectedCategory?.drivers || [];

    const displayedDriver = selectedId || currentDriver?.name || "未選択";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl min-w-[1100px] p-0 overflow-hidden flex flex-col max-h-[90vh] border-none shadow-2xl">
                <DialogHeader className="px-8 pt-8 pb-4 shrink-0 relative">
                    <div className="flex flex-col">
                        <DialogTitle className="text-2xl font-bold text-gray-900">運転手を選択</DialogTitle>
                        <div className="text-base text-gray-400 mt-2 font-medium">
                            選択中: {displayedDriver}
                        </div>
                    </div>
                    <DialogDescription className="sr-only">
                        運転手を選択するためのダイアログです。
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-hidden flex flex-col px-8 pb-4">
                    <div className="mb-6">
                        <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <PopoverTrigger asChild>
                                <button
                                    className="w-80 h-14 flex items-center justify-between px-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white"
                                    type="button"
                                >
                                    <span className="text-base text-gray-600 font-medium">{filterValue}</span>
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-2" align="start">
                                <div className="flex flex-col gap-1">
                                    {driverCategories.map((category) => (
                                        <button
                                            key={category.title}
                                            onClick={() => {
                                                setFilterValue(category.title);
                                                setDropdownOpen(false);
                                            }}
                                            className={`flex items-center justify-start px-4 py-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors text-base ${filterValue === category.title ? "bg-gray-50 font-medium" : ""
                                                }`}
                                            type="button"
                                        >
                                            {category.title}
                                        </button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid grid-cols-[80px_1.2fr_1fr_1.5fr_1.5fr] gap-4 py-4 text-sm font-bold text-gray-900 border-b-2 border-gray-100">
                        <div className="text-center invisible">選択</div>
                        <div className="pl-4">運転手氏名</div>
                        <div className="text-center">勤怠状況</div>
                        <div className="text-center">前日の退勤時刻/ハンドル時間</div>
                        <div className="text-center">翌日の出勤時刻/ハンドル時間</div>
                    </div>

                    <div className="flex-1 overflow-y-auto mt-2 custom-scrollbar">
                        {displayDrivers.length > 0 ? (
                            <div className="divide-y divide-gray-50">
                                {displayDrivers.map((driver, index) => {
                                    const isChecked = selectedId === driver.name;
                                    return (
                                        <div
                                            key={index}
                                            className="grid grid-cols-[80px_1.2fr_1fr_1.5fr_1.5fr] gap-4 items-center py-5 group cursor-pointer transition-all"
                                            onClick={() => setSelectedId(isChecked ? null : driver.name)}
                                        >
                                            <div className="flex justify-center">
                                                <div
                                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isChecked ? "border-black bg-white" : "border-gray-200 bg-white"
                                                        }`}
                                                >
                                                    {isChecked && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                                                </div>
                                            </div>

                                            <div className="text-base font-medium text-gray-800 pl-4">{driver.name}</div>

                                            <div className="flex justify-center items-center">
                                                {driver.attendanceStatus && driver.attendanceStatus !== "割付解除" ? (
                                                    <StatusBadge
                                                        type={getStatusTypeFromValue(driver.attendanceStatus)}
                                                        displayLabel={getDisplayLabelFromValue(driver.attendanceStatus)}
                                                        className="text-sm"
                                                    />
                                                ) : (
                                                    <span className="text-gray-300 text-sm">—</span>
                                                )}
                                            </div>

                                            <div className="text-base text-center text-gray-800">
                                                {driver.tomorrowMovementTime || "—"}
                                            </div>

                                            <div className="text-base text-center text-gray-800">
                                                {driver.holidayTime || "—"}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-20 text-center text-gray-300 italic border-t border-dashed">
                                対象の運転手はいません
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-8 py-6 flex justify-end shrink-0">
                    <Button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 px-12 py-6 text-lg font-medium rounded-xl shadow-lg transition-transform active:scale-95"
                    >
                        OK
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
