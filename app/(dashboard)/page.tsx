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
      <div className="relative items-center pt-4 px-4 flex justify-between w-full">
        <div className="text-[64px] text-[#2B7FFF] font-sen font-bold ml-7">BusEMS</div>

        {/*Mobile Menu*/}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2">
          <Menu className="w-6 h-6 justify-end" />
        </button>

        {/* MENU BAR */}
        <div className="hidden lg:flex justify-end">
          <div className="bg-[#1447E6] flex rounded-full overflow-hidden border-4 border-white h-[75px]">
              <button className=" text-white text-[24px] font-bold border-r-2 border-white w-[230px]">トップ</button>
              <button className=" text-white text-[24px] font-bold border-white border-r-2 flex items-center justify-center text-center leading-tight w-[200px]">基本マスタ<br/>アップロード</button>
              <button className=" text-white text-[24px] font-bold border-r-2 border-white w-[200px]">勤務表作成</button>
              <button className=" text-white text-[24px] font-bold border-white w-[230px]">勤務表作成済一覧</button>
            
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
      <div className="mt-2 ml-9 flex w-[96%] justify-between">
        <div className="font-bold text-[32px]">メニュー</div>

        <select className="border border-[#6A7282] px-2 py-1 flex justify-end w-[287px] rounded">
          <option className="">営業所切り替え</option>
        </select>
      </div>

      {/* MAIN BUTTONS */}
      <div className="flex justify-center mt-6 sm:mt-10 px-4">
        <div className="flex flex-col gap-4 lg:gap-15 w-[670px] lg:w-[50%]">
          <Button onClick={() => router.push("/master-upload")} className="bg-[#DBEAFE] text-black text-[48px] rounded-none h-16 text-xl lg:h-24 lg:text-4xl shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]">基本マスタアップロード</Button>
          <Button onClick={() => router.push("/working")} className="bg-[#DBEAFE] text-black text-[48px] rounded-none h-16 text-xl lg:h-24 lg:text-4xl shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]">勤務表一覧</Button>
          <Button onClick={() => router.push("/working/new")} className="bg-[#DBEAFE] text-black text-[48px] rounded-none h-16 text-xl lg:h-24 lg:text-4xl shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]">勤務表作成</Button>
        </div>      
      </div>
    </div>
  );
}