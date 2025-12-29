import { cn } from "@/lib/utils";

interface TaskCardProps {
    code: string;
    value: string;
    className?: string;
    hideValue?: boolean;
}

export const TaskCard = ({ code, value, className, hideValue }: TaskCardProps) => {
    return (
        <div className={cn("flex flex-col items-center justify-center text-xs font-semibold text-gray-700 p-0.5", className)}>
            <span className="text-[10px] text-gray-500 font-bold hover:text-blue-600 cursor-pointer">{code}</span>
            {!hideValue && (
                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-400 min-w-[32px] text-center">{value}</span>
            )}
        </div>
    );
};
