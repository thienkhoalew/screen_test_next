import { RotateCcw } from "lucide-react";

interface HistoryPanelProps {
    logs: { timestamp: string; message: string }[];
    onReset: () => void;
}

export const HistoryPanel = ({ logs, onReset }: HistoryPanelProps) => {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm h-full w-full overflow-hidden flex flex-col border border-gray-200">
            <div className="flex items-center gap-2 border-b border-gray-100">
                <button
                    onClick={onReset}
                    className="hover:bg-gray-100 p-1 rounded-full transition-colors group"
                    title="リセット"
                >
                    <RotateCcw className="h-4 w-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
                </button>
                <span className="font-bold text-gray-800 text-sm">保存履歴</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 p-1">
                {logs.length === 0 && <div className="text-gray-400 text-center text-xs py-2">履歴なし</div>}
                {logs.map((l, i) => (
                    <div key={i} className="bg-[#FFF9F5] border border-[#F5E6D8] rounded px-3 py-2 text-[11px] text-gray-500 flex flex-row items-start gap-3 shadow-sm">
                        <span className="text-gray-400 text-[10px] whitespace-nowrap shrink-0">{l.timestamp}</span>
                        <span className="text-gray-600 leading-relaxed flex-1">{l.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
