"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileIcon, X } from "lucide-react";

interface FileUploadBoxProps {
    onFileSelect?: (file: File | null) => void;
    className?: string;
    textLayout?: 'singleline' | 'multiline';
}

export function FileUploadBox({ onFileSelect, className, textLayout = 'multiline' }: FileUploadBoxProps) {
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            if (onFileSelect) onFileSelect(selectedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile);
            if (onFileSelect) onFileSelect(droppedFile);
        }
    };

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleClearFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        if (onFileSelect) onFileSelect(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <div
            onClick={handleButtonClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
        bg-[#F8FAFC]
        border ${isDragging ? "border-blue-500 bg-blue-50" : "border-[#E5E7EB]"}
        rounded-xl
        py-6 px-6
        flex flex-col sm:flex-row items-center justify-around
        gap-4
        cursor-pointer
        transition-colors
        relative
        ${className || ""}
      `}
        >
            <Input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={handleFileChange}
            />

            {file ? (
                <div className="flex flex-col items-center justify-center w-full py-4">
                    <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm relative">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <FileIcon className="w-[128px] h-[128px] text-blue-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{file.name}</span>
                            <span className="text-sm text-gray-500">
                                {(file.size / 1024).toFixed(2)} KB
                            </span>
                        </div>
                        <button
                            onClick={handleClearFile}
                            className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200"
                        >
                            <X className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center">
                        <div className="w-[95px] h-[95px] border rounded-xl flex items-center justify-center bg-white">
                            <Upload className="w-12 h-12 text-gray-500" />
                        </div>
                        <p className="text-[18px] text-[#364153] mt-2 leading-tight text-center">
                            {textLayout === 'singleline' ? (
                                'ファイルをここにドラッグ＆ドロップ'
                            ) : (
                                <>
                                    ファイルを<br />ここにドラッグ＆ドロップ
                                </>
                            )}
                        </p>
                    </div>

                    <div className="text-[#6A7282] text-[16px] hidden sm:block">または</div>
                    <Button
                        variant="whiteUploadBox"
                        className="pointer-events-none w-[273px] h-[50px] text-[16px]"
                        type="button"
                    >
                        ファイルを選択
                    </Button>
                </>
            )}
        </div>
    );
}
