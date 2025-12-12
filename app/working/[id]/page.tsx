"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";

export default function WorkingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="w-full p-2 ml-2">

      <div className="w-full flex items-center justify-between mb-6">

        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-[#333]">勤務計画表参照</h1>

          <Button variant="greenPillTwoLine">
            <span>自動作成</span>
            <span>処理完了</span>
          </Button>
        </div>

        <div className="flex items-center gap-3">
        <Button variant="red">削除</Button>
        <Button variant="yellow">制約チェック</Button>
        <Button variant="green">CSV出力</Button>
        <Button variant="blue">追加反映</Button>
        </div>
      </div>


    </div>
  );
}
