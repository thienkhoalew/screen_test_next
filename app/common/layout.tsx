"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommonLayout(
  { children }: { children: ReactNode }
) {
  const router = useRouter();

  return (
    <div className="w-[97%] mx-auto flex flex-col overflow-hidden">

      <header className="shrink-0">
        <div className="w-full flex items-center gap-4">

          <div className="flex-1 bg-[#BEDBFF] rounded text-center text-[40px] shadow-sm mt-4">
            共通ヘッダー
          </div>

          <Button
            className="
            flex-col
            gap-[2px]
            rounded-full
            bg-[linear-gradient(180deg,#E5E7EB_0%,#F3F4F6_50%,#D1D5DC_100%)]
            border-[1.11px]
            border-[#D1D5DC]
            shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]
            hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.15)]
            active:scale-95 transition-all
            h-[80px] w-[80px]
            items-center
            justify-center
            text-black
            mt-2"
            size="button-back"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-7 w-7 [stroke-width:3]" />
            <span className="text-xs">戻る</span>
          </Button>

        </div>
      </header>

      <main className="w-full flex-1 overflow-auto">
        {children}
      </main>

    </div>
  );
}
