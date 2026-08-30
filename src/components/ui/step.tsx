import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

function Steps({
  className,
  size = "default",
  ...props
}: HTMLAttributes<HTMLDivElement> & { size?: "sm" | "lg" | "default" }) {
  return (
    <div
      data-slot="steps"
      className={cn(
        "group/steps [counter-reset:step] flex flex-col",
        className
      )}
      data-size={size}
      {...props}
    />
  )
}

function Step({
  className,
  isSuccess,
  isError,
  isActive,
  isCollapsed,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  isSuccess?: boolean
  isError?: boolean
  isActive?: boolean
  isCollapsed?: boolean
}) {
  return (
    <div
      data-slot="step"
      className={cn(
        "group/step w-full [counter-increment:step] step",
        className
      )}
      data-collapsed={isCollapsed}
      data-active={isActive}
      data-success={isSuccess}
      data-error={isError}
      {...props}
    />
  )
}

function StepHeader({
  className,
  children,
  step,
  ...props
}: HTMLAttributes<HTMLDivElement> & { step?: number | string }) {
  return (
    <div
      data-slot="step-header"
      className={cn(
        "group/trigger relative flex flex-1 items-center gap-4 rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]/steps:size-10 data-[size=sm]/steps:size-6 dark:after:mix-blend-lighten"
        )}
      >
        <div
          data-slot={"step-count"}
          className={cn(
            "flex size-full items-center justify-center rounded-full bg-muted text-sm text-foreground group-data-[size=sm]/steps:text-xs step-count group-data-[success=true]/step:bg-success group-data-[error=true]/step:bg-destructive/60 group-data-[active=true]/step:bg-primary/80",
            !step && "before:content-[counter(step)]"
          )}
        >
          <div
            className={
              "group-data-[error=true]/step:hidden group-data-[success=true]/step:hidden"
            }
          >
            {step}
          </div>
        </div>
      </div>
      <div className={"flex-1"}>{children}</div>
    </div>
  )
}

function StepContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "group-data-[collapsed=true]/step:hidden group-data-[collapsed=true]/step:opacity-0 transition-all border-s-1 group-data-[size=lg]/steps:ps-5.5 group-data-[size=sm]/steps:ps-3.5 ps-4.5 group-data-[size=lg]/steps:ms-5.5 group-data-[size=sm]/steps:ms-3.5 ms-4.5 flex flex-col gap-4",
        className
      )}
    >
      {children}
    </div>
  )
}

function StepTitle(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="step-label"
      {...props}
      className={cn(
        "flex items-center gap-2 leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-muted-foreground group-data-[active=true]/step:text-primary group-data-[success=true]/step:text-success group-data-[error=true]/step:text-destructive text-base",
        props.className
      )}
    />
  )
}

function StepDescription(props: HTMLAttributes<HTMLDivElement>) {
  if (!props.children) return null

  return (
    <div
      data-slot="step-description"
      {...props}
      className={cn(
        "text-sm text-muted-foreground group-data-[collapsed=true]/step:hidden",
        props.className
      )}
    />
  )
}

function StepAction(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot={"step-actions"}
      {...props}
      className={cn(
        "flex flex-row items-center justify-between gap-4 has-[*:only-child]:justify-end",
        props.className
      )}
    />
  )
}

export {
  Step,
  StepAction,
  StepContent,
  StepDescription,
  StepHeader,
  Steps,
  StepTitle,
}
