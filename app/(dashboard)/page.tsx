"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white px-8 py-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold text-blue-600">BusEMS</div>

        {/* MENU BAR */}
        <div className="flex items-center justify-center">
          <div className="bg-blue-600 rounded-full flex overflow-hidden shadow">

            <div className="border-r border-white/30">
              <Button variant="menuActive">トップ</Button>
            </div>

            <div className="border-r border-white/30">
              <Button variant="menu">基本マスタアップロード</Button>
            </div>

            <div className="border-r border-white/30">
              <Button variant="menu">勤務表作成</Button>
            </div>

            <div>
              <Button variant="menu">勤務表作成済一覧</Button>
            </div>

          </div>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-xl font-semibold">メニュー</div>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>営業所切り替え</option>
        </select>
      </div>

      {/* MAIN BUTTONS */}
      <div className="flex flex-col items-center gap-8 mt-16">
        <Button variant="big_lightblue" size="big" >基本マスタアップロード</Button>
        <Button variant="big_lightblue" size="big" >勤務表一覧</Button>
        <Button variant="big_lightblue" size="big" >勤務表作成</Button>
      </div>

    </div>
  );
}
