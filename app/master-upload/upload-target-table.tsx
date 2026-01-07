"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";

export function UploadTargetTable() {
    return (
        <div>
            <h3 className="font-semibold mb-2">アップロード対象</h3>

            <div className="max-h-[220px] overflow-y-auto rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#F9FAFB]">
                            <TableHead className="w-[50px]">No</TableHead>
                            <TableHead>マスタ名</TableHead>
                            <TableHead>ファイル名</TableHead>
                            <TableHead>アップロード状態</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>運転手マスタ</TableCell>
                            <TableCell>driver_fms_20251111152344.csv</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="trash_button">
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </Button>
                                    <span className="whitespace-nowrap">取込準備完了</span>
                                </div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>車両マスタ</TableCell>
                            <TableCell> </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="trash_button">
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </Button>
                                    <span className="whitespace-nowrap">未アップロード</span>
                                </div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>3</TableCell>
                            <TableCell>仕業マスタ</TableCell>
                            <TableCell>sigyo_fms_20251111152355.csv</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="trash_button">
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </Button>
                                    <span className="whitespace-nowrap">取込済</span>
                                </div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>4</TableCell>
                            <TableCell>基本ローテーションマスタ</TableCell>
                            <TableCell> </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="trash_button">
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </Button>
                                    <span className="whitespace-nowrap">未アップロード</span>
                                </div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>5</TableCell>
                            <TableCell>車両割付マスタ</TableCell>
                            <TableCell> </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="trash_button">
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </Button>
                                    <span className="whitespace-nowrap">未アップロード</span>
                                </div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>6</TableCell>
                            <TableCell>便マスタ</TableCell>
                            <TableCell> </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="trash_button">
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </Button>
                                    <span className="whitespace-nowrap">未アップロード</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
