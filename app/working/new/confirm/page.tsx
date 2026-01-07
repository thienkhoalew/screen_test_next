"use client";

import { Button } from "@/components/ui/button";
import TableWrapper from "@/components/ui/table-wrapper";
import ConfirmTable from "./confirmTable";

export default function ConfirmPage() {
  return (
    <div className="w-full h-full p-2 flex flex-col overflow-x-auto overflow-y-hidden min-w-[800px]">

      <div className="w-full flex items-center justify-between mb-2 shrink-0">
        <div>
          <h1 className="text-[20px] font-bold text-[#333] mb-1">取込ファイル確認</h1>
          <div className="flex items-center gap-4 text-sm font-bold text-gray-700">
            <span>勤務表期間 : 2025/12/01~2025/12/31</span>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded text-xs border border-green-200">有給</span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-0.5 rounded text-xs border border-yellow-200">乗務不可日</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="orange">勤務計画表</Button>
          <Button variant="gray">配車計画表</Button>
        </div>
      </div>

      <div className="border rounded-xl p-2 bg-white shadow flex-1 min-h-0 flex flex-col overflow-hidden">
        <ConfirmTable />
      </div>

      <div className="w-full flex justify-end shrink-0 mt-2 z-50 w-[172px] h-[34px]">
        <Button>作成実行</Button>
      </div>

    </div>
  );
}