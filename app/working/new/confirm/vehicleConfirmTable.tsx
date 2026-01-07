"use client";

import { ComponentType } from "react";
import { MOCK_VEHICLES_CONFIRM, VEHICLE_FOOTER_DATA_CONFIRM } from "@/data/vehiclesConfirm";
import { DragEndEvent, DndContext } from "@dnd-kit/core";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {
    TooltipProvider,
} from "@/components/ui/tooltip";
import { Draggable } from "@/components/shared/dnd";
import { TaskCard } from "@/components/shared/cards";
import { createHeaderDateCell } from "@/components/shared/table";

const VehicleHeaderDateCell = createHeaderDateCell({
    startDayOfWeek: 1,
    weekdayLabel: "平日",
    weekendLabel: "休日",
    highlightWeekend: true,
    weekendColor: "text-blue-500 bg-blue-50",
    useSeparateWeekendColors: false,
});

const VehicleStatusCell: ComponentType<any> = ({ status }) => {
    if (!status) return null;

    const statusArray = Array.isArray(status) ? status : [status];

    return (
        <div className="flex flex-col gap-1 items-center justify-start h-full py-1">
            {statusArray.map((s, idx) => {
                if (!s) return null;

                if (s.type === "unavailable") {
                    return (
                        <div
                            key={idx}
                            className="w-6 h-6 flex items-center justify-center rounded bg-yellow-100 text-yellow-800 text-xs font-bold"
                        >
                            不
                        </div>
                    );
                }

                if (s.type === "reserve") {
                    return (
                        <div
                            key={idx}
                            className="w-6 h-6 flex items-center justify-center rounded bg-orange-100 text-orange-600 text-xs font-bold"
                        >
                            予
                        </div>
                    );
                }

                if (s.type === "work" && s.code) {
                    return (
                        <div
                            key={idx}
                            className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs font-medium whitespace-nowrap"
                        >
                            {s.code}
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
};

export default function VehicleConfirmTable() {
    const DATES = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleDragEnd = (event: DragEndEvent) => {
        console.log("Drag end:", event);
    };

    const tableContent = (
        <TooltipProvider>
            <div className="overflow-auto h-full w-full">
                <Table className="border-collapse border border-gray-300 min-w-max">
                    <TableHeader className="bg-gray-50 sticky top-0 z-40">
                        <TableRow className="h-16">
                            <TableHead className="w-24 border border-gray-300 bg-gray-100 text-center text-black font-bold sticky left-0 z-50">車両<br />グループ</TableHead>
                            <TableHead className="w-32 border border-gray-300 bg-gray-100 text-center text-black font-bold text-nowrap sticky left-24 z-50">車両</TableHead>
                            {DATES.map((day) => (
                                <TableHead key={day} className="w-16 border border-gray-300 bg-gray-50 text-center p-1 min-w-[4rem]">
                                    <VehicleHeaderDateCell day={day} />
                                </TableHead>
                            ))}
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs sticky right-[240px] z-50 shadow-[-1px_0_0_0_rgba(209,213,219,1)]">稼働日数</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs sticky right-[160px] z-50">非稼働日数</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs sticky right-[80px] z-50">稼働不可<br />日数</TableHead>
                            <TableHead className="w-20 border border-gray-300 bg-gray-100 text-center text-black font-bold text-xs sticky right-0 z-50">予備車両<br />日数</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {MOCK_VEHICLES_CONFIRM.map((vehicle) => (
                            <TableRow key={vehicle.id} className="h-16 hover:bg-transparent group">
                                <TableCell className="border border-gray-300 text-center py-2 sticky left-0 z-30 bg-gray-50 font-medium text-xs">{vehicle.group}</TableCell>
                                <TableCell className="border border-gray-300 text-center py-2 sticky left-24 z-30 bg-white font-medium text-sm whitespace-nowrap">{vehicle.number}</TableCell>
                                {DATES.map((day) => {
                                    const status = vehicle.schedule[day] || null;
                                    return (
                                        <TableCell
                                            key={day}
                                            className="border border-gray-300 text-center p-1 min-w-[4rem] align-top relative"
                                        >
                                            <VehicleStatusCell status={status} />
                                        </TableCell>
                                    );
                                })}
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50 sticky right-[240px] z-30 shadow-[-1px_0_0_0_rgba(209,213,219,1)]">{vehicle.stats.operatingDays}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50 sticky right-[160px] z-30">{vehicle.stats.nonOperatingDays}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50 sticky right-[80px] z-30">{vehicle.stats.unavailableDays}</TableCell>
                                <TableCell className="border border-gray-300 text-center text-sm bg-gray-50 sticky right-0 z-30">{vehicle.stats.reserveDays}</TableCell>
                            </TableRow>
                        ))}

                        <TableRow className="bg-yellow-50 font-medium h-20">
                            <TableCell colSpan={2} className="border border-gray-300 text-center py-2 sticky left-0 z-30 bg-yellow-50">未割付仕業数</TableCell>
                            {DATES.map((day) => {
                                const count = VEHICLE_FOOTER_DATA_CONFIRM.unassignedWorkCount[day as keyof typeof VEHICLE_FOOTER_DATA_CONFIRM.unassignedWorkCount];
                                return (
                                    <TableCell key={day} className="border border-gray-300 text-center py-2 min-w-[4rem]">
                                        {count > 0 && <span className="text-gray-700 font-bold">{count}</span>}
                                    </TableCell>
                                );
                            })}
                            <TableCell colSpan={4} className="bg-gray-100 border border-gray-300 sticky right-0 z-30"></TableCell>
                        </TableRow>

                        <TableRow className="bg-blue-50 font-medium h-20">
                            <TableCell colSpan={2} className="border border-gray-300 text-center py-2 sticky left-0 z-30 bg-blue-50">未割付仕業番号</TableCell>
                            {DATES.map((day) => {
                                const tasks = VEHICLE_FOOTER_DATA_CONFIRM.unassignedWorkNumber[day as keyof typeof VEHICLE_FOOTER_DATA_CONFIRM.unassignedWorkNumber];
                                return (
                                    <TableCell key={day} className="border border-gray-300 text-center py-1 text-xs px-1 align-top min-w-[4rem]">
                                        {tasks && tasks.map((task, idx) => task && (
                                            <Draggable key={idx} id={`unassigned-vehicle-${day}-${idx}`} data={task} className="mb-1">
                                                <div className="cursor-grab active:cursor-grabbing">
                                                    <TaskCard
                                                        code={task.code || ""}
                                                        value=""
                                                        hideValue={true}
                                                        className="bg-gray-100 border border-gray-200 rounded shadow-sm"
                                                    />
                                                </div>
                                            </Draggable>
                                        ))}
                                    </TableCell>
                                );
                            })}
                            <TableCell colSpan={4} className="bg-gray-100 border border-gray-300 sticky right-0 z-30"></TableCell>
                        </TableRow>

                        <TableRow className="bg-green-50 font-medium">
                            <TableCell colSpan={2} className="border border-gray-300 text-center py-2 sticky left-0 z-30 bg-green-50">外部応援見込数</TableCell>
                            {DATES.map((day) => {
                                const count = VEHICLE_FOOTER_DATA_CONFIRM.scanExpectation[day as keyof typeof VEHICLE_FOOTER_DATA_CONFIRM.scanExpectation];
                                return (
                                    <TableCell key={day} className="border border-gray-300 text-center py-2 text-gray-700 min-w-[4rem]">
                                        {count}
                                    </TableCell>
                                );
                            })}
                            <TableCell colSpan={4} className="bg-gray-100 border border-gray-300 sticky right-0 z-30"></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </TooltipProvider>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {tableContent}
        </DndContext>
    );
}
