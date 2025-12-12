"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"   // calendar mới của em

export function DatePickerInput({ value, onChange }: {
  value?: Date
  onChange?: (date: Date | undefined) => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[250px] justify-between text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "yyyy/MM/dd") : "YYYY/MM/DD"}
          <CalendarIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(d) => {
            onChange?.(d)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
