"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[#333]">
      <SliderPrimitive.Range className="absolute h-full bg-white" />
      <div className="absolute inset-0 flex justify-between px-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-full w-[1px] bg-[#444]"
            style={{
              transform: `translateX(${i * 10}%)`,
            }}
          />
        ))}
      </div>
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-white/50 bg-white hover:bg-white/90 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
