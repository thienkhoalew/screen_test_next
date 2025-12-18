"use client";

import { Button } from "@/components/ui/button";
import ConfirmTable from "./confirmTable";

export default function ConfirmPage() {
  return (
    <div className="bg-white p-4 rounded-xl">

      <div className="w-full flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-[20px] font-bold text-[#333]">取込ファイル確認</h1>
        </div>
      </div>
        <ConfirmTable/>

      <div className="w-full flex justify-end shrink-0 mt-2 z-50">
        <Button>作成実行</Button>
      </div>

    </div>
  );
}