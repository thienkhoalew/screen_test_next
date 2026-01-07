"use client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/shared/cards";

export const AssistantTaskAlert = ({ code, value }: { code: string; value: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    onClick={(e) => { e.stopPropagation(); setOpen(true); }}
                    className="flex-1 w-full h-full cursor-pointer hover:opacity-80 flex items-center justify-center"
                >
                    <TaskCard
                        code={code}
                        value={value}
                        hideValue={true}
                        className="w-[80%] mx-auto bg-[#F3F4F6] border border-gray-200 rounded-[4px] h-[19px] shadow-sm gap-0 py-0"
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[450px] p-6 shadow-xl z-[9999]" side="bottom" align="center">
                <div className="flex flex-col gap-4">
                    <p className="text-base text-gray-900">
                        1運転手に対して、同日内に複数仕業の割付調整を行う場合は、日次勤務計画調整にて調整してください。
                        <br /><br />
                        ※本画面では上記調整は行えず、参照のみです。
                    </p>
                    <div className="flex justify-center">
                        <Button onClick={() => setOpen(false)} className="bg-blue-500 hover:bg-blue-600 text-white px-8">OK</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
