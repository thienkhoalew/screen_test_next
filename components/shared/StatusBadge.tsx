import React from "react";

export type StatusType = "holiday" | "paid" | "spare" | "unavailable" | "assist" | "remove" | "assigned";

interface StatusBadgeProps {
    type: StatusType;
    displayLabel: string;
    className?: string;
}

const getStatusStyle = (type: StatusType) => {
    switch (type) {
        case "holiday":
            return "bg-blue-100 text-blue-600 border-blue-200";
        case "paid":
            return "bg-green-100 text-green-600 border-green-200";
        case "spare":
            return "bg-orange-100 text-orange-600 border-orange-200";
        case "unavailable":
            return "bg-red-100 text-red-600 border-red-200";
        case "assist":
            return "bg-purple-100 text-purple-600 border-purple-200";
        case "assigned":
            return "bg-gray-200 text-gray-700 border-gray-300";
        case "remove":
        default:
            return "bg-gray-100 text-gray-600 border-gray-200";
    }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, displayLabel, className = "" }) => {
    const baseStyle = getStatusStyle(type);

    if (type === "holiday" || type === "paid" || type === "spare" || type === "unavailable" || type === "assigned") {
        return (
            <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${baseStyle} ${className}`}>
                {displayLabel}
            </div>
        );
    }

    return (
        <div className={`px-3 py-2 rounded font-semibold text-sm ${baseStyle} ${className}`}>
            {displayLabel}
        </div>
    );
};

export const getStatusTypeFromValue = (value: string): StatusType => {
    switch (value) {
        case "公休":
            return "holiday";
        case "有休":
            return "paid";
        case "予備":
            return "spare";
        case "乗務不可":
            return "unavailable";
        case "助勤・外部応援":
            return "assist";
        case "割付済み":
            return "assigned";
        case "割付解除":
        default:
            return "remove";
    }
};

export const getDisplayLabelFromValue = (value: string): string => {
    switch (value) {
        case "公休":
            return "公";
        case "有休":
            return "有";
        case "予備":
            return "予";
        case "乗務不可":
            return "不";
        case "助勤・外部応援":
            return "助";
        case "割付済み":
            return "済";
        case "割付解除":
        default:
            return value;
    }
};
