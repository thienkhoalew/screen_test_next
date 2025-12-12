"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import TableWrapper from "@/components/ui/table-wrapper";
import DetailsTable from "./detailsTable";

export default function WorkingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="w-full h-full p-2 flex flex-col overflow-x-auto overflow-y-hidden min-w-[800px]">

      <div className="w-full flex items-center justify-between mb-2 shrink-0">

        <div className="flex items-center gap-4">
          <h1 className="text-[20px] font-bold text-[#333] whitespace-nowrap">勤務計画表参照</h1>

          <Button variant="greenPillTwoLine" className="shrink-0">
            <span>自動作成</span>
            <span>処理完了</span>
          </Button>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <Button variant="red">削除</Button>
          <Button variant="yellow">制約チェック</Button>
          <Button variant="green">CSV出力</Button>
          <Button variant="blue">追加反映</Button>
        </div>
      </div>

      <div className="w-1/2 flex items-center gap-2 bg-[#d9e9ff] px-4 py-2 rounded-md shrink-0 mb-2 min-w-fit">
        <div className="w-3 h-3 rounded-full bg-[#3A84C9] shrink-0"></div>
        <span className="text-[#2c6bb2] text-[20px] whitespace-nowrap">
          制約違反は検出されませんでした。
        </span>
      </div>

      <TableWrapper className="flex-1 min-h-0" title="勤務計画表: 2025/12/01~2025/12/31">
        <DetailsTable />
      </TableWrapper>

      <div className="w-full flex justify-end mt-2 z-50">
        <Button>作成実行</Button>
      </div>

    </div>

  );
}
