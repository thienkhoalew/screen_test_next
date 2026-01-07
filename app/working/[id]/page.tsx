"use client";

import { use, useRef } from "react";
import { Button } from "@/components/ui/button";
<<<<<<< Updated upstream
import TableWrapper from "@/components/ui/table-wrapper";
import DetailsTable from "./detailsTable";
=======
import TableWrapper from "@/components/features/schedule/TableWrapper";
import DetailsTable, { DetailsTableRef } from "./detailsTable";
import VehicleTable from "./vehicleTable";
import { Circle } from "lucide-react";
>>>>>>> Stashed changes

export default function WorkingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const detailsTableRef = useRef<DetailsTableRef>(null);

  const handleSubmit = () => {
    if (detailsTableRef.current) {
      const scheduleData = detailsTableRef.current.getScheduleData();

      console.log("=== 作成実行 - Schedule Data ===");
      console.log("Drivers:", scheduleData.drivers);
      console.log("Unassigned Works:", scheduleData.unassignedWorks);

      scheduleData.drivers.forEach((driver, index) => {
        console.log(`\nDriver ${index + 1}:`, {
          id: driver.id,
          name: driver.name,
          schedule: driver.schedule
        });
      });

      console.log("\n=== End Schedule Data ===");
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-x-auto overflow-y-auto min-w-[800px] mt-2">

      <div className="w-full flex items-center justify-between mb-2 shrink-0">

        <div className="flex items-center gap-4">
          <h1 className="text-[32px] font-bold">勤務計画表参照</h1>

          <Button variant="greenPillTwoLine" className="shrink-0">
            <span>自動作成</span>
            <span>処理完了</span>
          </Button>
        </div>

        <div className="flex items-center gap-7 shrink-0">
          <Button variant="red">削除</Button>
          <Button variant="yellow">制約チェック</Button>
          <Button variant="green">CSV出力</Button>
          <Button variant="blue">追加反映</Button>
        </div>
      </div>

      <div className="w-1/2 h-[55px] flex items-center gap-2 bg-[#BEDBFF] rounded mb-2">
        <Circle className="w-6 h-6 text-[#1447E6] ml-4" />
        <span className="text-[#1447E6] text-[16px]">
          制約違反は検出されませんでした。
        </span>
      </div>

<<<<<<< Updated upstream
      <TableWrapper className="flex-1 min-h-0" title="勤務計画表: 2025/12/01~2025/12/31">
        <DetailsTable />
      </TableWrapper>

      <div className="w-full flex justify-end mt-2 z-50">
        <Button>作成実行</Button>
=======
      <TableWrapper className="flex-1" title={
        <div className="flex items-center gap-12">
          <span className="text-[20px]">勤務表期間 : 2025/12/01~2025/12/31</span>
          <div className="flex items-center gap-3 text-[12px] text-center">
            <span className="rounded-[7px] border border-[#BEDBFF] bg-[#DBEAFE] text-[#193CB8] font-medium w-[66px] leading-[22px]">公休</span>
            <span className="rounded-[7px] border border-[#B9F8CF] bg-[#DCFCE7] text-[#016630] font-medium w-[66px] leading-[22px]">希望休</span>
            <span className="rounded-[7px] border border-[#DFC9F1] bg-[#F3E8FE] text-[#8A4FBC] font-medium w-[66px] leading-[22px]">有休</span>
            <span className="rounded-[7px] border border-[#FEE1E1] bg-[#E1A9A8] text-[#9A2422] font-medium w-[66px] leading-[22px]">乗務不可</span>
            <span className="rounded-[7px] border border-[#FFF085] bg-[#FEF9C2] text-[#894B00] font-medium w-[66px] leading-[22px]">予備ダイヤ</span>
          </div>
        </div>
      }>
        {(viewMode) => viewMode === "work-schedule" ? <DetailsTable ref={detailsTableRef} /> : <VehicleTable />}
      </TableWrapper>

      <div className="w-full flex justify-end mt-2 z-50 gap-6">
        <Button className="bg-black text-white hover:bg-gray-800 w-[172px] h-[48px] rounded-[10px] text-[24px]" onClick={handleSubmit}>保存</Button>
        <Button className="bg-black text-white hover:bg-gray-800 w-[172px] h-[48px] rounded-[10px] text-[24px]">確定</Button>
>>>>>>> Stashed changes
      </div>

    </div>

  );
}

