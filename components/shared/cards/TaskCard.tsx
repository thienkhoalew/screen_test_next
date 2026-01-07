import { cn } from "@/lib/utils";

interface TaskCardProps {
    code: string;
    value: string;
    className?: string;
    hideValue?: boolean;
}

export const TaskCard = ({ code, value, className, hideValue }: TaskCardProps) => {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-1 w-full text-[10px]", className)}>
            <div className="bg-[#F3F4F6] rounded w-full text-center">
                <span className= "text-gray-700">{code}</span>
            </div>
            {!hideValue && (
                <div className="bg-white border border-[#D1D5DC] px-2 py-0.5 rounded w-full text-center">
                    <span className="text-[#6A7282]">{value}</span>
                </div>
            )}
        </div>
    );
};
