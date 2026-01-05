"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";


export interface DriverInfo {
    name: string;
    // Attendance/work status
    attendanceStatus?: string;
    // Tomorrow's movement/work time
    tomorrowMovementTime?: string;
    // Next day handle time
    nextDayHandleTime?: string;
    // Holiday time
    holidayTime?: string;
    // Next day handle time for holiday
    holidayNextDayHandleTime?: string;
    // Location info (e.g., "他営業所")
    location?: string;
}



interface DriverCardProps {
    driver: DriverInfo;
    onClick?: (driver: DriverInfo) => void;
}


export default function DriverCard({ driver, onClick }: DriverCardProps) {
    const hasDetailedInfo = driver.tomorrowMovementTime || driver.nextDayHandleTime || driver.holidayTime || driver.holidayNextDayHandleTime;

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={`text-sm text-center text-gray-600 py-1 hover:bg-gray-50 transition-colors rounded px-2 ${onClick ? 'cursor-pointer' : ''}`}
                        onClick={() => onClick?.(driver)}
                    >
                        {driver.name}
                    </div>
                </TooltipTrigger>
                {hasDetailedInfo && (
                    <TooltipContent side="right" className="max-w-md bg-white border shadow-xl p-0">
                        <div className="p-4 space-y-3">
                            <div className="font-bold text-base border-b pb-2 text-gray-900">
                                {driver.name}
                            </div>

                            {(driver.tomorrowMovementTime || driver.nextDayHandleTime) && (
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-700">
                                        {driver.tomorrowMovementTime && (
                                            <span className="inline-block mr-4">
                                                前日退勤時間
                                                <span className="font-semibold ml-1">{driver.tomorrowMovementTime}</span>
                                            </span>
                                        )}
                                        {driver.nextDayHandleTime && (
                                            <span className="inline-block">
                                                前日ハンドル時間
                                                <span className="font-semibold ml-1">{driver.nextDayHandleTime}</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {(driver.holidayTime || driver.holidayNextDayHandleTime) && (
                                <div className="space-y-1">
                                    <div className="text-sm text-gray-700">
                                        {driver.holidayTime && (
                                            <span className="inline-block mr-4">
                                                翌日出勤時間
                                                <span className="font-semibold ml-1">{driver.holidayTime}</span>
                                            </span>
                                        )}
                                        {driver.holidayNextDayHandleTime && (
                                            <span className="inline-block">
                                                翌日ハンドル時間
                                                <span className="font-semibold ml-1">{driver.holidayNextDayHandleTime}</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {driver.location && (
                                <div className="text-sm text-gray-500 pt-2 border-t">
                                    <span className="font-medium">所属:</span> {driver.location}
                                </div>
                            )}
                        </div>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
}

