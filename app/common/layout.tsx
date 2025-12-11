"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommonLayout(
    {children}: { children: ReactNode}
) {
    const router = useRouter();

    return(
        <div className="min-h-screen bg-gray-50">
            <header className="w-full">
                <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center gap-4">
                    <div className="flex-1 bg-[#c7dfff] py-4 rounded-lg text-center text-[35px] shadow-sm">
                        共通ヘッダー
                    </div>
                    
                    <Button
                        variant="circleIcon"
                        size="button-back"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-7 w-7 [stroke-width:3]" />
                        <span className="text-xs">戻る</span>
                    </Button>
                </div>
            </header>

            <main className="p-2 mx-auto max-w-[1500px]">
                {children}
            </main>
        </div>
    );
}