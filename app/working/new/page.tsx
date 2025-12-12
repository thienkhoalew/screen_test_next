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
    <div className="space-y-6" style={{ backgroundColor: "#FFFBFA" }}>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 ml-10">勤務表新規作成</h2>

        <Button variant="green">
          <div className="flex flex-col gap-1 text-[15px]">
            <span>外部作成</span>
            <span>勤務表取込</span>
          </div>
        </Button>
      </div>

      {/* Date Pickers */}
      <div>
        <div className="ml-10">
          <p className="text-gray-500">
            作成する期間を選択したうえで、必要なインプットファイルをアップロードしてください
          </p>
        </div>

        <div className="mt-4 flex gap-6 ml-10">
          <div className="flex flex-col">
            <label className="text-sm mb-1">勤務表開始日</label>
            <DatePickerInput />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">勤務表終了日</label>
            <DatePickerInput />
          </div>
        </div>
      </div>

      {/* Upload Box */}
      <div className="flex justify-center">
        <div
          className="
            w-[70%]
            bg-[#F8FAFC]
            border border-[#E5E7EB]
            rounded-xl
            py-4 px-6
            flex flex-col items-center justify-center gap-6
          "
        >
          {/* Up */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-[95px] h-[95px] border rounded-xl flex items-center justify-center bg-white">
              <Upload className="w-12 h-12 text-gray-500" />
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-tight text-center">
              ファイルをここにドラッグ＆ドロップ
            </p>
          </div>

          {/* Middle */}
          <div className="text-gray-400 text-sm">または</div>

          {/* Right */}
          <Button variant="customWhite">ファイルを選択</Button>
        </div>
      </div>

      {/* Upload Target Table */}
      <div className="flex justify-center">
        <div className="w-[70%]">
          <h3 className="font-semibold mb-2">アップロード対象</h3>

          <div className="relative">
            <div className="max-h-[220px] overflow-y-auto border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow style={{ backgroundColor: "#F9FAFB" }}>
                    <TableHead>No</TableHead>
                    <TableHead>インプット情報</TableHead>
                    <TableHead>ファイル名</TableHead>
                    <TableHead> </TableHead>
                    <TableHead className="text-center">アップロード状態</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {/* Row 1 */}
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>助勤者情報</TableCell>
                    <TableCell>jyokin_fms_20251111152355.csv</TableCell>
                    <TableCell>
                      <Button variant="trash_button">
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">取込準備完了</TableCell>
                  </TableRow>

                  {/* Row 2 */}
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>運転手出勤・乗務不可情報</TableCell>
                    <TableCell> </TableCell>
                    <TableCell>
                      <Button variant="trash_button">
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">未アップロード</TableCell>
                  </TableRow>

                  {/* Row 3 */}
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>運転手確定仕業情報</TableCell>
                    <TableCell> </TableCell>
                    <TableCell>
                      <Button variant="trash_button">
                        <Trash2 className="w-4 h-4 text-white" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">未アップロード</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify mb-10">
              <Button variant="customBlack">
                仮取込実行
              </Button>
      </div>

    </div>
  );
}
