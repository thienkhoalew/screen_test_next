"use client";

import { Button } from "@/components/ui/button";
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
    <div className="ml-6 space-y-6" style={{ backgroundColor: "#FFFBFA" }}>
      
      {/* Title */}
      <h2 className="text-2xl font-bold">基本マスタアップロード</h2>

      <div className="w-full flex items-start gap-6">
        {/* Upload Box */}
        <div className="w-[70%] ml-15">
          <div
            className="
            bg-[#F8FAFC]
            border border-[#E5E7EB]
            rounded-xl
            py-4 px-6
            flex items-center justify-around
          "
          >
            {/* Left */}
            <div className="flex flex-col items-center">
              <div className="w-[95px] h-[95px] border rounded-xl flex items-center justify-center bg-white">
                <Upload className="w-12 h-12 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mt-2 leading-tight text-center">
                ファイルを<br />ここにドラッグ＆ドロップ
              </p>
            </div>

            {/* Middle */}
            <div className="text-gray-400 text-sm">または</div>

            {/* Right */}
            <Button variant="customWhite">
              ファイルを選択
            </Button>
          </div>
        </div>

        {/* Action button */}
        <Button variant="customBlack">
          取込実行
        </Button>
      </div>

      {/* Two Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Upload Target Table */}
        <div>
          <h3 className="font-semibold mb-2">アップロード対象</h3>

          <div className="max-h-[220px] overflow-y-auto rounded-lg">
            <Table>
              <TableHeader>
                <TableRow style={{ backgroundColor: "#F9FAFB" }}>
                  <TableHead>No</TableHead>
                  <TableHead>マスタ名</TableHead>
                  <TableHead>ファイル名</TableHead>
                  <TableHead>アップロード状態</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                {/* Row 1 */}
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>運転手マスタ</TableCell>
                  <TableCell>driver_fms_20251111152344.csv</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="trash_button">
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                      <span>取込準備完了</span>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>車両マスタ</TableCell>
                  <TableCell> </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="trash_button">
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                      <span>未アップロード</span>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Row 3 */}
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>仕業マスタ</TableCell>
                  <TableCell>sigyo_fms_20251111152355.csv</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="trash_button">
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                      <span>取込済</span>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Row 4 */}
                <TableRow>
                  <TableCell>4</TableCell>
                  <TableCell>基本ローテーションマスタ</TableCell>
                  <TableCell> </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="trash_button">
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                      <span>未アップロード</span>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>5</TableCell>
                  <TableCell>車両割付マスタ</TableCell>
                  <TableCell> </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="trash_button">
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                      <span>未アップロード</span>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>6</TableCell>
                  <TableCell>便マスタ</TableCell>
                  <TableCell> </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="trash_button">
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                      <span>未アップロード</span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Current master table */}
        <div>
          <h3 className="font-semibold mb-2">現在のマスタ設定ファイル</h3>
            <div className="max-h-[220px] overflow-y-auto rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: "#F9FAFB" }}>
                    <TableHead>No</TableHead>
                    <TableHead>マスタ名</TableHead>
                    <TableHead>ファイル名</TableHead>
                    <TableHead>アップロード日時</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>運転手マスタ</TableCell>
                    <TableCell>
                      <span className="text-blue-600 underline cursor-pointer">
                        driver_fms_20251028191931.csv
                      </span>
                    </TableCell>
                    <TableCell>2025-10-28 19:19:31</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>車両マスタ</TableCell>
                    <TableCell>
                      <span className="text-blue-600 underline cursor-pointer">
                        bus_vehicle_fms_20250324191931.csv
                      </span>
                    </TableCell>
                    <TableCell>2025-03-24 19:19:31</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>仕業マスタ</TableCell>
                    <TableCell>
                      <span className="text-blue-600 underline cursor-pointer">
                        sijyo_fms_20250324191931.csv
                      </span>
                    </TableCell>
                    <TableCell>2025-03-24 19:19:31</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell>基本ローテーションマスタ</TableCell>
                    <TableCell>
                      <span className="text-blue-600 underline cursor-pointer">
                        basic rotation_fms_20250324191931.csv
                      </span>
                    </TableCell>
                    <TableCell>22025-03-24 19:19:31</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>5</TableCell>
                    <TableCell>車両割付マスタ</TableCell>
                    <TableCell>
                      <span className="text-blue-600 underline cursor-pointer">
                        Vehicle allocation_fms_20250324191931.csv
                      </span>
                    </TableCell>
                    <TableCell>2025-03-24 19:19:31</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>6</TableCell>
                    <TableCell>便マスタ</TableCell>
                    <TableCell>
                      <span className="text-blue-600 underline cursor-pointer">
                        bin_fms_20250324191931.csv
                      </span>
                    </TableCell>
                    <TableCell>2025-03-24 19:19:31</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
      </div>
    </div>
  );
}
