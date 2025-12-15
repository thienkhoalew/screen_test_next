"use client";

import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/datetime-picker";
import { Upload, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function MasterUploadPage() {
  return (
    <div className="h-full w-full bg-white overflow-y-auto">
      <div className="w-full py-8 space-y-4">

        {/* Header */}
        <div className="max-w-[1500px] w-full mx-auto px-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">勤務表新規作成</h2>

          <Button variant="green" className="h-auto py-2 px-6">
            <div className="flex flex-col gap-0.5 text-[13px] leading-tight text-center font-bold">
              <span>外部作成</span>
              <span>勤務表取込</span>
            </div>
          </Button>
        </div>

        {/* Date Pickers */}
        <div className="max-w-[1500px] w-full mx-auto px-6 space-y-2">
          <p className="text-sm text-gray-600">
            作成する期間を選択したうえで、必要なインプットファイルをアップロードしてください
          </p>

          <div className="flex gap-10">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600">勤務表開始日</label>
              <DatePickerInput />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600">勤務表終了日</label>
              <DatePickerInput />
            </div>
          </div>
        </div>

        {/* Upload Box */}
        <div className="w-[80%] mx-auto bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-8 flex flex-col items-center justify-center gap-4 mt-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 border border-gray-200 rounded-xl flex items-center justify-center bg-white shadow-sm">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-500">
              ファイルをここにドラッグ＆ドロップ
            </p>
          </div>

          <div className="text-xs text-gray-400 font-medium">または</div>

          <Button variant="customWhite" className="shadow-sm">ファイルを選択</Button>
        </div>

        {/* Upload Target Table */}
        <div className="w-[80%] mx-auto">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB] h-10 border-b border-gray-200">
                  <TableHead className="w-[50px] font-medium text-xs text-gray-500 pl-4">No</TableHead>
                  <TableHead className="w-[300px] font-medium text-xs text-gray-500">インプット情報</TableHead>
                  <TableHead className="font-medium text-xs text-gray-500">ファイル名</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="w-[150px] text-right font-medium text-xs text-gray-500 pr-4">アップロード状態</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Row 1 */}
                <TableRow className="h-14 border-b border-gray-100 hover:bg-transparent">
                  <TableCell className="text-xs font-medium pl-4">1</TableCell>
                  <TableCell className="text-xs font-medium">助勤者情報</TableCell>
                  <TableCell className="text-xs text-gray-600">jyokin_fms_20251111152355.csv</TableCell>
                  <TableCell>
                    <Button variant="trash_button">
                      <Trash2 className="w-4 h-4 text-white" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right text-xs font-bold text-gray-800 pr-4">取込準備完了</TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow className="h-14 border-b border-gray-100 hover:bg-transparent">
                  <TableCell className="text-xs font-medium pl-4">2</TableCell>
                  <TableCell className="text-xs font-medium">運転手出勤・乗務不可情報</TableCell>
                  <TableCell> </TableCell>
                  <TableCell>
                    <Button variant="trash_button">
                      <Trash2 className="w-4 h-4 text-white" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right text-xs font-medium text-gray-400 pr-4">未アップロード</TableCell>
                </TableRow>

                {/* Row 3 */}
                <TableRow className="h-14 border-b border-gray-100 hover:bg-transparent">
                  <TableCell className="text-xs font-medium pl-4">3</TableCell>
                  <TableCell className="text-xs font-medium">運転手確定仕業情報</TableCell>
                  <TableCell> </TableCell>
                  <TableCell>
                    <Button variant="trash_button">
                      <Trash2 className="w-4 h-4 text-white" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right text-xs font-medium text-gray-400 pr-4">未アップロード</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto flex justify-end pt-4 pb-10">
        <Button className="h-10 bg-black text-white px-8 text-sm hover:bg-gray-800 rounded-md">
          仮取込実行
        </Button>
      </div>
    </div>
  );
}
