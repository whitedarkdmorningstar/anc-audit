"use client"

import { cn } from "@/lib/utils"
import { HTMLAttributes, useEffect, useState } from "react"

interface FlipProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  hasFlipped?: boolean
  flipOnce?: boolean
}

export function Flip({
  disabled,
  hasFlipped,
  flipOnce,
  className,
  ...props
}: FlipProps) {
  const [flipped, setFlipped] = useState<boolean>(false)

  useEffect(() => {
    // No flipping
    if (disabled) return
    // Card has already flipped
    if (!hasFlipped) return

    const to = setTimeout(() => setFlipped(true), 500)

    return () => clearTimeout(to)
  }, [disabled, hasFlipped])

  const showBack = () => setFlipped(true)

  const flip = () => setFlipped((prev) => !prev)

  return (
    <div
      data-slot={"flip"}
      data-flipped={flipped}
      {...props}
      className={cn(
        "group/flip relative rounded-md transition min-h-20 min-w-24 duration-800 [transform-style:preserve-3d] border-3 border-border",
        flipped && "[transform:rotateY(180deg)]",
        className
      )}
      onClick={(e) => {
        if (disabled) return
        if (hasFlipped) return

        if (flipOnce) {
          !flipped && props.onClick?.(e)
          showBack()
        } else {
          flip()
        }
      }}
    />
  )
}

export function FlipFront({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot={"flip-front"}
      {...props}
      className={cn(
        "absolute bg-card p-3 flex items-center justify-center text-sm text-card-foreground rounded-md inset-0 [backface-visibility:hidden] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  )
}

export function FlipBack({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot={"flip-back"}
      {...props}
      className={cn(
        "absolute p-3 flex flex-col items-center justify-center inset-0 bg-primary/30 text-primary-foreground text-sm rounded-md [backface-visibility:hidden] [transform:rotateY(180deg)]  cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  )
}
