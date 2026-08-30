import { formatDate } from "date-fns"
import { Controller, useFormContext } from "react-hook-form"
import { Calendar } from "../ui/calendar"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

export interface FieldDateInputProps {
  label: string
  description?: string
  name: string
}

export default function FieldDateInput({
  label,
  description,
  name,
}: FieldDateInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Popover>
          <Field data-invalid={Boolean(error?.message)}>
            <FieldLabel>{label}</FieldLabel>
            <PopoverTrigger
              render={
                <button
                  aria-invalid={Boolean(error?.message)}
                  className={
                    "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                  }
                >
                  {formatDate(field.value, "yyyy-MM-dd")}
                </button>
              }
            />
            {error?.message ? (
              <FieldError>{error.message}</FieldError>
            ) : (
              <FieldDescription>{description}</FieldDescription>
            )}
          </Field>
          <PopoverContent>
            <Calendar
              className={"w-full"}
              selected={field.value}
              onSelect={field.onChange}
              mode={"single"}
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}
