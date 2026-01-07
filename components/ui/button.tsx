import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        customBlue: "h-9 bg-blue-600 text-white hover:bg-blue-700",
        customWhite: "h-9 w-45 bg-white text-black border border-gray-300 hover:bg-gray-100",
        whiteUploadBox: "bg-white text-black border border-gray-300 hover:bg-gray-100",
        menu: "bg-transparent text-white h-12 px-8 text-base flex items-center justify-center hover:bg-blue-700/30 transition",
        menuActive: "bg-blue-600 text-white h-12 px-8 text-base flex items-center justify-center",
        big_lightblue: "bg-blue-100 text-black hover:bg-blue-200 shadow rounded-none text-2xl h-[300px] flex items-center justify-center w-[500px] border-none",
        trash_button: "w-7 h-7 flex items-center justify-center rounded-full bg-black",
        red: "w-[172px] h-[55px] bg-[#FB2C36B2] hover:bg-red-500 text-white rounded-lg shadow text-lg font-medium",
        yellow: "w-[172px] h-[55px] bg-[#FFC000] hover:bg-yellow-500 text-black rounded-lg shadow text-lg font-bold",
        green: "w-[172px] h-[55px] bg-[#016630B2] hover:bg-green-700 text-white rounded-lg shadow text-lg font-medium",
        blue: "w-[172px] h-[55px] bg-[#5B9BD5] hover:bg-blue-600 text-white rounded-lg shadow text-lg font-medium",
        greenPillTwoLine: "bg-[#7CB342] text-white rounded-full shadow flex flex-col items-center justify-center text-center w-[112px] h-[48px] leading-[1.1] gap-[0px] text-[16px]",
        orange: "bg-[#E8924F] text-white flex items-center w-[175px] h-[38px] text-[16px]",
        gray: "bg-[#536675] text-white flex items-center w-[175px] h-[38px] text-[16px]",
        grayBordered: "bg-[#D1D5DC] text-[#364153] border border-[#6A7282] hover:bg-gray-300 h-[45px] text-[20px] font-medium rounded",
      },
      size: {
        default: "px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        "button-back": "p-4 text-[11px]",
        big: "h-[80px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
