"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"]

const isRedDay = (date: Date) => {
  const redDays = [3, 7, 10, 14, 18, 21, 26, 30]

  return redDays.includes(date.getDate())
}

export function JapaneseCalendar({
  selected,
  onSelect,
  currentMonth = new Date()
}: {
  selected?: Date
  onSelect?: (date: Date) => void
  currentMonth?: Date
}) {
  const [displayMonth, setDisplayMonth] = React.useState(currentMonth)

  const firstDay = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days = []
  const current = new Date(startDate)

  for (let i = 0; i < 42; i++) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  const goToPreviousMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1))
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return selected && date.toDateString() === selected.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === displayMonth.getMonth()
  }

  return (
    <div className="w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
      <div className="flex items-center justify-between mb-3 bg-gray-100 rounded px-2 py-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPreviousMonth}
          className="h-6 w-6 p-0 hover:bg-gray-200"
        >
          <ChevronLeft className="h-3 w-3" />
        </Button>

        <div className="text-xs font-medium">
          一覧に戻る
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={goToNextMonth}
          className="h-6 w-6 p-0 hover:bg-gray-200"
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {WEEKDAYS.map((day, index) => (
          <div
            key={day}
            className={cn(
              "text-center text-xs font-medium py-1",
              index === 0 ? "text-red-500" : index === 6 ? "text-blue-500" : "text-gray-700"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((date, index) => {
          const isRedDayDate = isRedDay(date)
          const isTodayDay = isToday(date)
          const isSelectedDay = isSelected(date)
          const isCurrentMonthDay = isCurrentMonth(date)

          return (
            <button
              key={index}
              onClick={() => onSelect?.(date)}
              className={cn(
                "h-8 w-8 text-xs transition-colors relative border border-gray-300",
                // Base styles for current month days
                isCurrentMonthDay && "bg-gray-100 text-gray-700 hover:bg-gray-200",
                // Other month days
                !isCurrentMonthDay && "bg-gray-50 text-gray-400 border-gray-200 cursor-default",
                // Red days styling (pink background)
                isRedDayDate && isCurrentMonthDay && "bg-red-200 text-red-700",
                // Today styling (light yellow background)
                isTodayDay && "bg-yellow-100 border-yellow-300",
                // Selected styling
                isSelectedDay && "bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
              )}
              disabled={!isCurrentMonthDay}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      {/* Footer message */}
      <div className="mt-3 text-xs text-red-400 text-center">
        ※赤くぬられた日は休診日です
      </div>
    </div>
  )
}

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
        <JapaneseCalendar
          selected={value}
          onSelect={(date) => {
            onChange?.(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
