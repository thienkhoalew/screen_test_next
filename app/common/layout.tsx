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
    <div className="h-screen bg-gray-50 pt-2 flex flex-col overflow-hidden">

      <header className="w-full shrink-0">
        <div className="max-w-[1500px] mx-auto px-4 flex items-center gap-4">

          <div className="flex-1 bg-[#c7dfff] py-3 rounded-lg text-center text-[25px] shadow-sm">
            共通ヘッダー
          </div>

          <Button
            className="flex-col gap-0.5 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow h-15 w-15 items-center justify-center text-black"
            size="button-back"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-7 w-7 [stroke-width:3]" />
            <span className="text-xs">戻る</span>
          </Button>

        </div>
      </header>

      <main className="mx-auto max-w-[1500px] w-full flex-1 overflow-auto">
        {children}
      </main>

    </div>
  );
}
