"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { JapaneseCalendar } from "@/components/ui/datetime-picker";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const handleUpload = () => {
        router.push("/working/new");
    }
    return (
        <div className="ml-4 py-1">
            <div className="flex items-center gap-4 mb-1">
                <h2 className="text-[40px] font-bold">日次勤務計画調整</h2>
                <Badge className="bg-[#00A3E0] text-white text-[16px] w-[112px] h-[48px] rounded-full text-sm font-medium border-none">
                    調整中
                </Badge>
            </div>

            <div className="flex items-center gap-4 mb-1 bg-white px-2 py-1 rounded border-b border-[#E5DDD0]">
                <Button variant="ghost" className="text-black hover:text-gray-600 hover:bg-transparent p-0 h-auto w-auto">
                    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ minWidth: '24px', minHeight: '40px' }}>
                        <path d="M18 6L6 20L18 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Button>

                <Popover>
                    <PopoverTrigger asChild>
                        <div className="w-[275px] h-[61px] border border-[#99A1AF] rounded text-[48px] font-normal flex items-center justify-center">
                            12月01日
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 border-none bg-transparent shadow-none" align="center">
                        <JapaneseCalendar selected={new Date(2025, 11, 1)} />
                    </PopoverContent>
                </Popover>

                <Button variant="ghost" className="text-black hover:text-gray-600 hover:bg-transparent p-0 h-auto w-auto">
                    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ minWidth: '24px', minHeight: '40px' }}>
                        <path d="M6 6L18 20L6 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Button>

                <Button variant="blue" onClick={handleUpload} className="ml-auto w-[207px] h-[48px] rounded-md shadow-sm font-medium">
                    日次実績反映
                </Button>
            </div>

            <div className="flex items-center gap-1">
                <Button variant="yellow" className="font-bold text-[24px] rounded-md w-[223px] h-[48px] mb-4">
                    制約チェック
                </Button>
            </div>
        </div>
    );
}
