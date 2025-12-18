"use client";

import { Button } from "@/components/ui/button";
import { UploadTargetTable } from "./upload-target-table";
import { CurrentMasterTable } from "./current-master-table";
import { FileUploadBox } from "@/components/custom/file-upload-box";

export default function MasterUploadPage() {
  const handleFileSelect = (file: File | null) => {
    console.log("Selected file:", file);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-6">

      <h2 className="text-2xl font-bold">基本マスタアップロード</h2>

      <div className="w-full flex justify-center flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-full md:w-[70%]">
          <FileUploadBox onFileSelect={handleFileSelect} />
        </div>

        <Button variant="customBlack" className="w-full md:w-auto">
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
