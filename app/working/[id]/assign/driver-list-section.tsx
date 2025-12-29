"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryPanel } from "@/app/working/[id]/components/HistoryPanel";

const driverCategories = [
    {
        title: "予備",
        headerColor: "bg-[#FFE6CC]",
        drivers: ["小林 太郎", "山本 太郎", "吉田 太郎", "田中 太郎", "佐々木 太郎", "佐藤 花子"]
    },
    {
        title: "助勤・外部応援",
        headerColor: "bg-[#E6D8D3]",
        drivers: ["小林 太郎", "山本 太郎", "吉田 太郎", "田中 太郎 (他営業所)", "佐々木 太郎 (他営業所)", "鈴木 一郎"]
    },
    {
        title: "公休",
        headerColor: "bg-[#DAE8FC]",
        drivers: ["小林 太郎", "山本 太郎", "吉田 太郎", "田中 太郎", "佐々木 太郎", "高橋 建"]
    },
    {
        title: "有給",
        headerColor: "bg-[#D5E8D4]",
        drivers: ["小林 太郎", "山本 太郎", "吉田 太郎", "田中 太郎", "佐々木 太郎"]
    },
    {
        title: "乗務不可",
        headerColor: "bg-[#FFF2CC]",
        drivers: ["小林 太郎", "山本 太郎", "吉田 太郎", "田中 太郎", "佐々木 太郎"]
    },
    {
        title: "その他",
        headerColor: "bg-[#D4D5D8]",
        drivers: ["小林 太郎", "山本 太郎", "吉田 太郎", "田中 太郎", "佐々木 太郎"]
    }
];

interface DriverListSectionProps {
    className?: string;
    historyLogs: { timestamp: string; message: string }[];
    onReset: () => void;
}

export default function DriverListSection({ className, historyLogs, onReset }: DriverListSectionProps) {
    return (
        <div className={cn("flex gap-1 w-full", className)}>
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-2 flex flex-col min-h-0">
                <div className="mb-2 shrink-0">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">割付可能運転手一覧</h3>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">仕業ID</label>
                        <Input
                            type="text"
                            placeholder="仕業を選択"
                            className="h-8 text-sm w-[200px]"
                        />
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-6 gap-2 min-h-0 overflow-hidden">
                    {driverCategories.map((cat, index) => (
                        <Card key={index} className="flex flex-col h-full overflow-hidden rounded-lg border-gray-200 p-0 gap-0">
                            <div className={cn("py-2 px-3 text-center text-sm font-normal text-gray-700", cat.headerColor)}>
                                {cat.title}
                            </div>
                            <ScrollArea className="flex-1 h-0 bg-white">
                                <div className="space-y-1">
                                    {cat.drivers.map((driver, dIndex) => (
                                        <div key={dIndex} className="text-sm text-center text-gray-600 py-1">
                                            {driver}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="w-[380px] shrink-0">
                <HistoryPanel logs={historyLogs} onReset={onReset} />
            </div>
        </div>
    );
}
