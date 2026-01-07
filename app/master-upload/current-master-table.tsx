"use client";

import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";

export function CurrentMasterTable() {
    return (
        <div>
            <h3 className="font-bold text-[20px] mb-2">現在のマスタ設定ファイル</h3>
            <div className="max-h-[220px] overflow-y-auto">
                <Table>
                    <TableHeader className="h-[63px] text-[16px] w-[6%]">
                        <TableRow className="bg-[#F9FAFB]">
                            <TableHead>No</TableHead>
                            <TableHead>マスタ名</TableHead>
                            <TableHead>ファイル名</TableHead>
                            <TableHead>アップロード日時</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow className="h-[64px] text-[16px]">
                            <TableCell>1</TableCell>
                            <TableCell>運転手マスタ</TableCell>
                            <TableCell>
                                <span className="text-blue-600 underline cursor-pointer">
                                    driver_fms_20251028191931.csv
                                </span>
                            </TableCell>
                            <TableCell>2025-10-28 19:19:31</TableCell>
                        </TableRow>

                        <TableRow className="h-[64px] text-[16px]">
                            <TableCell>2</TableCell>
                            <TableCell>車両マスタ</TableCell>
                            <TableCell>
                                <span className="text-blue-600 underline cursor-pointer">
                                    bus_vehicle_fms_20250324191931.csv
                                </span>
                            </TableCell>
                            <TableCell>2025-03-24 19:19:31</TableCell>
                        </TableRow>

                        <TableRow className="h-[64px] text-[16px]">
                            <TableCell>3</TableCell>
                            <TableCell>仕業マスタ</TableCell>
                            <TableCell>
                                <span className="text-blue-600 underline cursor-pointer">
                                    sijyo_fms_20250324191931.csv
                                </span>
                            </TableCell>
                            <TableCell>2025-03-24 19:19:31</TableCell>
                        </TableRow>

                        <TableRow className="h-[64px] text-[16px]">
                            <TableCell>4</TableCell>
                            <TableCell>基本ローテーションマスタ</TableCell>
                            <TableCell>
                                <span className="text-blue-600 underline cursor-pointer">
                                    basic rotation_fms_20250324191931.csv
                                </span>
                            </TableCell>
                            <TableCell>2025-03-24 19:19:31</TableCell>
                        </TableRow>

                        <TableRow className="h-[64px] text-[16px]">
                            <TableCell>5</TableCell>
                            <TableCell>車両割付マスタ</TableCell>
                            <TableCell>
                                <span className="text-blue-600 underline cursor-pointer">
                                    Vehicle allocation_fms_20250324191931.csv
                                </span>
                            </TableCell>
                            <TableCell>2025-03-24 19:19:31</TableCell>
                        </TableRow>

                        <TableRow className="h-[64px] text-[16px]">
                            <TableCell>6</TableCell>
                            <TableCell>便マスタ</TableCell>
                            <TableCell>
                                <span className="text-blue-600 underline cursor-pointer">
                                    bin_fms_20250324191931.csv
                                </span>
                            </TableCell>
                            <TableCell>2025-03-24 19:19:31</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
