"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

export default function WorkingPage() {
  const page = 1;
  const totalPages = 1;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">勤務表一覧</h2>

      <section className="bg-white p-4 rounded-xl shadow border">
        <h3 className="text-lg font-semibold mb-4">日次勤務計画調整</h3>
        <div className="max-h-40 overflow-y-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableCell className="font-semibold">勤務表開始日</TableCell>
                <TableCell className="font-semibold">勤務表終了日</TableCell>
                <TableCell className="font-semibold">作成日</TableCell>
                <TableCell className="font-semibold">最終保存日時</TableCell>
                <TableCell className="font-semibold text-center">CSV出力</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <a href="#" className="text-blue-500 underline">2025/11/01</a>
                </TableCell>
                <TableCell>
                  <a href="#" className="text-blue-500 underline">2025/11/30</a>
                </TableCell>
                <TableCell>2025/10/10</TableCell>
                <TableCell>2025/11/09</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
                    出力
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <a href="#" className="text-blue-500 underline">2025/11/01</a>
                </TableCell>
                <TableCell>
                  <a href="#" className="text-blue-500 underline">2025/11/30</a>
                </TableCell>
                <TableCell>2025/10/10</TableCell>
                <TableCell>2025/11/09</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
                    出力
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <a href="#" className="text-blue-500 underline">2025/11/01</a>
                </TableCell>
                <TableCell>
                  <a href="#" className="text-blue-500 underline">2025/11/30</a>
                </TableCell>
                <TableCell>2025/10/10</TableCell>
                <TableCell>2025/11/09</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
                    出力
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <a href="#" className="text-blue-500 underline">2025/11/01</a>
                </TableCell>
                <TableCell>
                  <a href="#" className="text-blue-500 underline">2025/11/30</a>
                </TableCell>
                <TableCell>2025/10/10</TableCell>
                <TableCell>2025/11/09</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
                    出力
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <a href="#" className="text-blue-500 underline">2025/11/01</a>
                </TableCell>
                <TableCell>
                  <a href="#" className="text-blue-500 underline">2025/11/30</a>
                </TableCell>
                <TableCell>2025/10/10</TableCell>
                <TableCell>2025/11/09</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
                    出力
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="text-center">
                  <Button className="bg-gray-500 hover:bg-gray-600 text-white px-6">
                    出力
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow border">
        <h3 className="text-lg font-semibold mb-4">作成中・発表済み勤務計画</h3>
        <div className="max-h-40 overflow-y-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableCell className="font-semibold">勤務表開始日</TableCell>
                <TableCell className="font-semibold">勤務表終了日</TableCell>
                <TableCell className="font-semibold">ステータス</TableCell>
                <TableCell className="font-semibold">作成日時</TableCell>
                <TableCell className="font-semibold">最終保存日時</TableCell>
                <TableCell className="font-semibold">発表日</TableCell>
                <TableCell className="font-semibold text-center">CSV出力</TableCell>
                <TableCell className="font-semibold text-center">削除</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <a className="text-blue-500 underline" href="#">2025/12/01</a>
                </TableCell>
                <TableCell>2026/12/31</TableCell>
                <TableCell>
                  <Badge className="bg-gray-500 text-white">未発表</Badge>
                </TableCell>
                <TableCell>2025/11/01 09:25</TableCell>
                <TableCell>2025/10/10 12:05</TableCell>
                <TableCell>2025/10/10</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-5">
                    出力
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-5">
                    削除
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <a className="text-blue-500 underline" href="#">2025/12/01</a>
                </TableCell>
                <TableCell>2026/12/31</TableCell>
                <TableCell>
                  <Badge className="bg-gray-500 text-white">未発表</Badge>
                </TableCell>
                <TableCell>2025/11/01 09:25</TableCell>
                <TableCell>2025/10/10 12:05</TableCell>
                <TableCell>2025/10/10</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-5">
                    出力
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-5">
                    削除
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <a className="text-blue-500 underline" href="#">2025/12/01</a>
                </TableCell>
                <TableCell>2026/12/31</TableCell>
                <TableCell>
                  <Badge className="bg-gray-500 text-white">未発表</Badge>
                </TableCell>
                <TableCell>2025/11/01 09:25</TableCell>
                <TableCell>2025/10/10 12:05</TableCell>
                <TableCell>2025/10/10</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-5">
                    出力
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-5">
                    削除
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <a className="text-blue-500 underline" href="#">2025/11/01</a>
                </TableCell>
                <TableCell>2025/11/30</TableCell>
                <TableCell>
                  <Badge className="bg-blue-600 text-white">発表済</Badge>
                </TableCell>
                <TableCell>2025/10/01 09:30</TableCell>
                <TableCell>2025/10/10 12:05</TableCell>
                <TableCell>2025/10/10</TableCell>
                <TableCell className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-5">
                    出力
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button className="bg-gray-600 hover:bg-gray-700 text-white px-5">
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>


        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(p) => console.log("Change to page:", p)}
        />
      </section>
    </div>
  );
}
