"use client";
import { Button } from "@/components/ui/button";
import { UploadTargetTable } from "./upload-target-table";
import { CurrentMasterTable } from "./current-master-table";
import { FileUploadBox } from "@/components/features/upload/FileUploadBox";

export default function MasterUploadPage() {
  const handleFileSelect = (file: File | null) => {
    console.log("Selected file:", file);
  };

  return (
    <div className="mx-auto p-4 space-y-6 bg-[#FFFBFA]">

      <h2 className="text-[32px] font-bold">基本マスタアップロード</h2>

      <div className="flex justify-center flex-col md:flex-row items-start md:items-end gap-6">
        <div className="w-[1063px]">
          <FileUploadBox onFileSelect={handleFileSelect} />
        </div>

          <Button className="w-[165px] h-[59px] bg-black text-white hover:bg-gray-900 text-[24px]">
          取込実行
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <UploadTargetTable />
        <CurrentMasterTable />
      </div>
    </div>
  );
}
