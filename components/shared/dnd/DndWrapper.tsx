import { useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Draggable = ({ id, data, children, className }: { id: string, data?: any, children: React.ReactNode, className?: string }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id,
        data: data,
    });

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
        position: 'relative' as 'relative',
    } : undefined;

    if (!isMounted) {
        return <div className={cn(className)}>{children}</div>;
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={cn(className, isDragging ? "opacity-50 z-[9999]" : "")}>
            {children}
        </div>
    );
};

export const Droppable = ({ id, data, children, className }: { id: string, data?: any, children: React.ReactNode, className?: string }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: id,
        data: data,
    });

    return (
        <div ref={setNodeRef} className={cn("h-full w-full min-h-[4rem] flex items-center justify-center", className, isOver ? "bg-blue-100" : "")}>
            {children}
        </div>
    );
};
