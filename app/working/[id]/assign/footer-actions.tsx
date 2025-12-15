"use client";

import { Button } from "@/components/ui/button";

export default function FooterActions() {
    return (
        <div className="flex justify-end gap-6">
            <Button className="w-32 bg-black hover:bg-gray-800 text-white font-medium rounded">
                保存
            </Button>
            <Button className="w-32 bg-black hover:bg-gray-800 text-white font-medium rounded">
                計画確定
            </Button>
            <Button className="w-40 bg-black hover:bg-gray-800 text-white font-medium rounded">
                実績投入後締め
            </Button>
        </div>
    );
}
