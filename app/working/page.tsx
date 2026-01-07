"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";

export default function WorkingPage() {
  const page = 2;
  const totalPages = 7;

  return (
    <div className="w-full p-2">
      <h2 className="text-[32px] font-bold">勤務表一覧</h2>
      <div className="h-[36px]">
        {/*Thong bao*/}
      </div >
      <div className="w-[95%] mx-auto bg-white p-4 rounded-xl shadow border mb-6">
        <h3 className="text-[24px] font-semibold mb-4">日次勤務計画調整</h3>

        <section>
          <div className="rounded-xl border border-gray-200 w-[90%] mx-auto mb-6 bg-white overflow-hidden">
            <div className="pr-[17px] border-b border-gray-200 bg-[#F8F9FD]">
              <Table className="border-collapse w-full text-[15.75px] table-fixed">
                <TableHeader>
                  <TableRow className="h-[45px]">
                    <TableHead className="w-[20%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">勤務表開始日</TableHead>
                    <TableHead className="w-[20%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">勤務表終了日</TableHead>
                    <TableHead className="w-[20%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">作成日</TableHead>
                    <TableHead className="w-[20%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">最終保存日時</TableHead>
                    <TableHead className="w-[20%] text-center text-gray-600 font-normal h-[45px]">CSV出力</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
            <div className="overflow-y-scroll max-h-[110px]">
              <Table className="border-collapse w-full text-[15.75px] table-fixed">

                <TableBody>
                  {[...Array(10)].map((_, i) => (
                    <TableRow className="hover:bg-transparent" key={i}>
                      <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[20%]">
                        <a href="#" className="text-blue-500 underline decoration-1 underline-offset-2">2025/11/01</a>
                      </TableCell>
                      <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[20%]">
                        <a href="#" className="text-blue-500 underline decoration-1 underline-offset-2">2025/11/30</a>
                      </TableCell>
                      <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[20%]">2025/10/10</TableCell>
                      <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[20%]">2025/11/09</TableCell>
                      <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[20%]">
                        <Button className="bg-[#569D79] hover:bg-[#458C68] text-white rounded-md w-24 h-9 shadow-sm">
                          出力
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {[...Array(5)].map((_, i) => (
                    <TableRow className="hover:bg-transparent" key={`draft-${i}`}>
                      <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[20%]"></TableCell>
                      <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[20%]"></TableCell>
                      <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[20%]"></TableCell>
                      <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[20%]">
                        2025/11/30<br />12:05
                      </TableCell>
                      <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[20%]">
                        <Button className="bg-[#727889] hover:bg-[#626879] text-white rounded-md w-24 h-9 shadow-sm">
                          出力
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </div>

      <div className="w-[95%] mx-auto bg-white p-4 rounded-xl shadow border">
        <h3 className="text-[24px] font-semibold mb-4">作成中・発表済み勤務計画</h3>
        <div className="w-full rounded-xl border border-gray-200 mx-auto mb-4 bg-white overflow-hidden">
          <div className="pr-[17px] border-b border-gray-200 bg-[#F8F9FD]">
            <Table className="border-collapse w-full text-[15.75px] table-fixed">
              <TableHeader>
                <TableRow className="h-[45px]">
                  <TableHead className="w-[12%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">勤務表開始日</TableHead>
                  <TableHead className="w-[12%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">勤務表終了日</TableHead>
                  <TableHead className="w-[10%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">ステータス</TableHead>
                  <TableHead className="w-[15%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">作成日時</TableHead>
                  <TableHead className="w-[15%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">最終保存日時</TableHead>
                  <TableHead className="w-[12%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">発表日</TableHead>
                  <TableHead className="w-[12%] border-r border-gray-200 text-center text-gray-600 font-normal h-[45px]">CSV出力</TableHead>
                  <TableHead className="w-[12%] text-center text-gray-600 font-normal h-[45px]">削除</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
          <div className="overflow-y-scroll  max-h-[190px]">
            <Table className="border-collapse w-full text-[15.75px] table-fixed">

              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[12%]">
                    <a className="text-blue-500 underline decoration-1 underline-offset-2" href="#">2025/12/01</a>
                  </TableCell>
                  <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[12%]">2026/12/31</TableCell>
                  <TableCell className="border border-gray-200 text-center py-1 h-[55px] w-[10%]">
                    <div className="flex flex-col items-center leading-tight">
                      <span className="text-red-500 font-bold text-xs">自動作成</span>
                      <span className="text-red-500 font-bold text-xs">処理完了</span>
                    </div>
                  </TableCell>
                  <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[15%]">
                    2025/11/01<br />09:25
                  </TableCell>
                  <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[15%]"></TableCell>
                  <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[12%]"></TableCell>
                  <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[12%]">
                    <Button className="bg-[#569D79] hover:bg-[#458C68] text-white rounded-md w-24 h-9 shadow-sm">
                      出力
                    </Button>
                  </TableCell>
                  <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[12%]">
                    <Button className="bg-[#FF8080] hover:bg-[#FF6666] text-white rounded-md w-24 h-9 shadow-sm">
                      削除
                    </Button>
                  </TableCell>
                </TableRow>

                {[...Array(6)].map((_, i) => (
                  <TableRow className="hover:bg-transparent" key={`published-${i}`}>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[12%]">
                      <a className="text-blue-500 underline decoration-1 underline-offset-2" href="#">2025/11/01</a>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[12%]">2025/11/30</TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[10%]">
                      <span className="text-gray-600 font-medium text-sm">発表済</span>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[15%]">
                      2025/10/01<br />09:30
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[15%]">
                      2025/10/10<br />12:05
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[12%]">2025/10/10</TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[12%]">
                      <Button className="bg-[#569D79] hover:bg-[#458C68] text-white rounded-md w-24 h-9 shadow-sm">
                        出力
                      </Button>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[12%]">
                      <Button className="bg-[#727889] hover:bg-[#626879] text-white rounded-md w-24 h-9 shadow-sm">
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {[...Array(6)].map((_, i) => (
                  <TableRow className="hover:bg-transparent" key={`published-old-${i}`}>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[12%]">
                      <a className="text-blue-500 underline decoration-1 underline-offset-2" href="#">2025/10/01</a>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[12%]">2025/10/31</TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[10%]">
                      <span className="text-gray-600 font-medium text-sm">発表済</span>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[15%]">
                      2025/09/01<br />09:20
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[15%]">
                      2025/09/10<br />13:40
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] text-gray-600 w-[12%]">2025/09/10</TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[12%]">
                      <Button className="bg-[#569D79] hover:bg-[#458C68] text-white rounded-md w-24 h-9 shadow-sm">
                        出力
                      </Button>
                    </TableCell>
                    <TableCell className="border border-gray-200 text-center py-2 h-[55px] w-[12%]">
                      <Button className="bg-[#727889] hover:bg-[#626879] text-white rounded-md w-24 h-9 shadow-sm">
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>


        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(p) => console.log("Change to page:", p)}
        />
      </div>
    </div>
  );
}
