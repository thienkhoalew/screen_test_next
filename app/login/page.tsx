"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/"); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">ログインページ</h1>

        <div className="flex flex-col gap-3 w-72 mx-auto">
          <input
            type="email"
            placeholder="ログインIDを入力してください。"
            className="p-2 rounded-lg border border-gray-300 text-sm"
          />
          <input
            type="password"
            placeholder="パスワードを入力してください。"
            className="p-2 rounded-lg border border-gray-300 text-sm"
          />

          <Button variant="customBlue" onClick={handleLogin}>
            ログイン
          </Button>
        </div>
      </div>
    </div>
  );
}
