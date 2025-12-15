"use client";

import { Badge } from "@/components/ui/badge";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

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

const historyData = Array.from({ length: 15 }, (_, i) => ({
    version: `バージョン${10 - i}`,
    date: "2025/11/27 15:02:27"
}));

export default function DriverListSection({ className }: { className?: string }) {
    return (
        <div className={cn("flex gap-4 w-full min-w-[1200px]", className)}>
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col min-h-0">
                <div className="mb-2 shrink-0">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">割付可能運転手一覧</h3>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">仕業ID</label>
                        <input
                            type="text"
                            placeholder="仕業を選択"
                            className="border border-gray-300 rounded px-3 py-1.5 text-sm w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-6 gap-3 min-h-0 overflow-hidden">
                    {driverCategories.map((cat, index) => (
                        <div key={index} className="flex flex-col h-full border border-gray-200 rounded overflow-hidden">
                            <div className={cn("py-2 text-center text-xs font-bold text-gray-700 border-b border-gray-200", cat.headerColor)}>
                                {cat.title}
                            </div>
                            <div className="flex-1 overflow-y-auto bg-white p-2 space-y-2">
                                {cat.drivers.map((driver, dIndex) => (
                                    <div key={dIndex} className="text-xs text-center text-gray-700 py-1">
                                        {driver}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-[320px] bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                    <RotateCcw className="w-4 h-4 text-gray-600" />
                    <h3 className="font-bold text-lg text-gray-800">保存履歴</h3>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    {historyData.map((item, index) => (
                        <div key={index} className="bg-[#FFF9F2] border border-[#F5E6D3] rounded p-2 flex items-center justify-between">
                            <Badge className="bg-[#1F2937] hover:bg-[#111827] text-white text-[10px] px-2 py-0.5 rounded-sm h-6">
                                {item.version}
                            </Badge>
                            <span className="text-xs text-gray-500 font-medium">{item.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
