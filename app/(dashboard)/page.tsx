"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react"
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleUpload = () => {
    router.push("/master-upload"); 
  };

  const handleWorking = () => {
    router.push("/working"); 
  };

  const handleNewWork = () => {
    router.push("/working/new"); 
  };
  
  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="relative pt-5 px-4 flex justify-between w-full">
        <div className="text-[#2B7FFF] font-bold text-4xl ml-7">BusEMS</div>

        {/*Mobile Menu*/}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2">
          <Menu className="w-6 h-6 justify-end" />
        </button>

        {/* MENU BAR */}
        <div className="hidden lg:flex justify-end">
          <div className="bg-[#1447E6] flex rounded-full">
            <div className="">
              <button className="px-3 py-2 lg:px-6 lg:py-4 text-white text-sm font-semibold">トップ</button>
            </div>

            <div className="">
              <button className="px-3 py-2 lg:px-6 lg:py-4 text-white text-sm font-semibold">基本マスタアップロード</button>
            </div>

            <div className="">
              <button className="px-3 py-2 lg:px-6 lg:py-4 text-white text-sm font-semibold">勤務表作成</button>
            </div>

            <div>
              <button className="px-3 py-2 lg:px-6 lg:py-4 text-white text-sm font-semibold">勤務表作成済一覧</button>
            </div>
          </div>
        </div>

        {open && (
          <div className="absolute right-1 top-full w-56 bg-[#1447E6] rounded-xl shadow-lg lg:hidden">
            <button className="block w-full text-left px-4 py-3 text-white">トップ</button>
            <button className="block w-full text-left px-4 py-3 text-white">基本マスタアップロード</button>
            <button className="block w-full text-left px-4 py-3 text-white">勤務表作成</button>
            <button className="block w-full text-left px-4 py-3 text-white">勤務表作成済一覧</button>
          </div>
        )}
      </div>

      {/* ROW 2 */}
      <div className="mt-5 ml-9 flex w-[90%] justify-between">
        <div className="font-semibold text-2xl">メニュー</div>

        <select className="border px-2 py-1 flex justify-end">
          <option className="">営業所切り替え</option>
        </select>
      </div>

      {/* MAIN BUTTONS */}
      <div className="flex justify-center mt-6 sm:mt-10 px-4">
        <div className="flex flex-col gap-4 lg:gap-7 w-[80%] lg:w-[50%]">
          <Button onClick={() => router.push("/master-upload")} className="bg-[#DBEAFE] text-black text-4xl rounded-none h-16 text-xl lg:h-24 lg:text-4xl">基本マスタアップロード</Button>
          <Button onClick={() => router.push("/working")} className="bg-[#DBEAFE] text-black text-4xl rounded-none h-16 text-xl lg:h-24 lg:text-4xl">勤務表一覧</Button>
          <Button onClick={() => router.push("/working/new")} className="bg-[#DBEAFE] text-black text-4xl rounded-none h-16 text-xl lg:h-24 lg:text-4xl">勤務表作成</Button>
        </div>      
      </div>
    </div>
  );
}