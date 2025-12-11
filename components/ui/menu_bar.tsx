"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function MenuBar() {
  const pathname = usePathname();

  const menus = [
    { label: "トップ", href: "/" },
    { label: "基本マスタアップロード", href: "/master-upload" },
    { label: "勤務表作成", href: "/shift-create" },
    { label: "勤務表作成一覧", href: "/shift-result" },
  ];

  return (
    <div className="flex bg-blue-600 text-white rounded-full p-1 px-3 shadow-md">
      {menus.map((m, i) => (
        <Link key={i} href={m.href}>
          <Button
            variant="ghost"
            className={`
              text-white px-6 py-2 rounded-full
              ${pathname === m.href ? "bg-blue-700" : "hover:bg-blue-500"}
            `}
          >
            {m.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
