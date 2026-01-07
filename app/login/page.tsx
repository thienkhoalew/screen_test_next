"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#FFFBFA]">
      <div className="items-center gap-13 flex flex-col">
        <h1 className="text-[64px] font-bold font-inter text-[#281D1B]">ログインページ</h1>

        <div className="flex flex-col gap-5 w-72 mx-auto font-inter w-[400px]">
          <input
            type="email"
            placeholder="ログインIDを入力してください。"
            className="
            p-2 rounded bg-[#EFF6FF] 
            border-gray-300
            placeholder-[#2E181466] 
            text-[24px] leading-[24px]"

          />
          <input
            type="password"
            placeholder="パスワードを入力してください。"
            className="
            p-2 rounded bg-[#EFF6FF]
            border-gray-300 
            placeholder-[#2E181466] 
            text-[24px] leading-[24px]"
          />

          <Button className="h-[70px] font-medium text-[24px]" variant="customBlue" onClick={handleLogin}>
            ログイン
          </Button>
        </div>
      </div>
    </div>
  );
}
