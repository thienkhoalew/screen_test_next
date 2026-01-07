"use client";

import { Button } from "@/components/ui/button";
import { DatePickerInput } from "@/components/ui/datetime-picker";
import { Upload, Trash2 } from "lucide-react";
import { FileUploadBox } from "@/components/features/upload/FileUploadBox";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function MasterUploadPage() {
  const handleFileSelect = (file: File | null) => {
    console.log("Selected file:", file);
  };
  return (
    <div className="w-full bg-white overflow-y-auto">
      <div className="w-full py-2 space-y-4">

        {/* Header */}
        <div className="w-[95%] mx-auto flex items-center justify-between">
          <h2 className="text-[32px] font-bold text-[#0A0A0A]">勤務表新規作成</h2>

          <Button variant="green" className="h-auto py-2 px-6">
            <div className="flex flex-col gap-0.5 text-[13px] leading-tight text-center font-bold">
              <span>外部作成</span>
              <span>勤務表取込</span>
            </div>
          </Button>
        </div>

        {/* Date Pickers */}
        <div className="ml-10 mx-auto px-6 space-y-2">
          <p className="text-[18px] text-[#4A5565]">
            作成する期間を選択したうえで、必要なインプットファイルをアップロードしてください
          </p>

          <div className="flex gap-10">
            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-[#0A0A0A]">勤務表開始日</label>
              <DatePickerInput />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-[#0A0A0A]">勤務表終了日</label>
              <DatePickerInput />
            </div>
          </div>
        </div>

        {/* Upload Box */}
        <div className="mx-auto w-[75%]">
          <FileUploadBox onFileSelect={handleFileSelect} className="flex !flex-col" textLayout="singleline" />
        </div>

        {/* Upload Target Table */}
        <div className="mx-auto w-[75%]">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table className="text-[16px] text-[#0A0A0A]">
              <TableHeader className="h-[63px]">
                <TableRow className="bg-[#F9FAFB] hover:bg-[#F9FAFB] border-b border-gray-200">
                  <TableHead className="w-[70px]  pl-4">No</TableHead>
                  <TableHead className="w-[300px] ">インプット情報</TableHead>
                  <TableHead className="">ファイル名</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="w-[150px] text-right pr-4">アップロード状態</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Row 1 */}
                <TableRow className="h-[64px] border-b border-gray-100 hover:bg-transparent">
                  <TableCell className="pl-4">1</TableCell>
                  <TableCell className="">助勤者情報</TableCell>
                  <TableCell className="">jyokin_fms_20251111152355.csv</TableCell>
                  <TableCell>
                    <Button variant="trash_button">
                      <Trash2 className="w-4 h-4 text-white" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right pr-4">取込準備完了</TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow className="h-[64px] border-b border-gray-100 hover:bg-transparent">
                  <TableCell className="pl-4">2</TableCell>
                  <TableCell className=" ">運転手出勤・乗務不可情報</TableCell>
                  <TableCell> </TableCell>
                  <TableCell>
                    <Button variant="trash_button">
                      <Trash2 className="w-4 h-4 text-white" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right pr-4">未アップロード</TableCell>
                </TableRow>

                {/* Row 3 */}
                <TableRow className="h-[64px] border-b border-gray-100 hover:bg-transparent">
                  <TableCell className="pl-4">3</TableCell>
                  <TableCell className="">運転手確定仕業情報</TableCell>
                  <TableCell> </TableCell>
                  <TableCell>
                    <Button variant="trash_button">
                      <Trash2 className="w-4 h-4 text-white" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right pr-4">未アップロード</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className=" mx-auto flex justify-end pb-4 ">
        <Button className="h-[55px] w-[172px] bg-black text-white px-8 text-[24px] hover:bg-gray-800 rounded-md fixed bottom-12">
          仮取込実行
        </Button>
      </div>
    </div>
  );
}
