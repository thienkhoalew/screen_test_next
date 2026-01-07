"use client";

import { Button } from "@/components/ui/button";

interface FooterActionsProps {
    onSave?: () => void;
    onConfirm?: () => void;
    onClose?: () => void;
}

export default function FooterActions({ onSave, onConfirm, onClose }: FooterActionsProps) {
    return (
        <div className="flex justify-end gap-6">
            <Button
                className="w-[223px] bg-black hover:bg-gray-800 text-white font-medium rounded"
                onClick={onSave}
            >
                保存
            </Button>
            <Button
                className="w-[223px] bg-black hover:bg-gray-800 text-white font-medium rounded"
                onClick={onConfirm}
            >
                計画確定
            </Button>
            <Button
                className="w-[223px] bg-black hover:bg-gray-800 text-white font-medium rounded"
                onClick={onClose}
            >
                実績投入後締め
            </Button>
        </div>
    );
}
