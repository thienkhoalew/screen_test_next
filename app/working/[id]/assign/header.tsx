"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { JapaneseCalendar } from "@/components/ui/datetime-picker";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const handleUpload = () => {
        router.push("/working/new");
    }
    return (
        <div className="mt-2 ml-4">
            <div className="flex items-center gap-4 mb-2">
                <h2 className="text-[25px] font-bold text-gray-900">日次勤務計画調整</h2>
                <Badge className="bg-[#00A3E0] hover:bg-[#0284C7] text-white rounded-full px-6 py-3 text-sm font-medium border-none">
                    調整中
                </Badge>
            </div>

            <div className="flex items-center gap-1 mb-2 bg-white px-2 py-1 rounded">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 hover:bg-transparent">
                    <ChevronLeft className="h-15 w-15" strokeWidth={1.5} />
                </Button>

                <Popover>
                    <PopoverTrigger asChild>
                        <div className="border border-gray-200 rounded px-2 py-1 text-[20px] font-normal min-w-[150px] text-center bg-white text-gray-900 mx-1 cursor-pointer hover:bg-gray-50">
                            12月01日
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 border-none bg-transparent shadow-none" align="center">
                        <JapaneseCalendar selected={new Date(2025, 11, 1)} />
                    </PopoverContent>
                </Popover>

                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 hover:bg-transparent">
                    <ChevronRight className="h-15 w-15" strokeWidth={1.5} />
                </Button>

                <Button variant="blue" onClick={handleUpload} className="ml-auto h-10 px-6 rounded-md shadow-sm font-medium ">
                    日次実績反映
                </Button>
            </div>

            <div className="flex items-center gap-1">
                <Button variant="yellow" className="font-bold border-none shadow-md text-base px-8 w-auto min-w-[140px]">
                    制約チェック
                </Button>
            </div>
        </div>
    );
}
