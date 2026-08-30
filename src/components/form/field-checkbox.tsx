"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Controller, useFormContext } from "react-hook-form"

interface FieldCheckboxProps {
  label: string
  name: string
}

export function FieldCheckbox(props: FieldCheckboxProps) {
  const { label, name } = props
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Field orientation="horizontal" data-invalid={Boolean(error)}>
          <Checkbox
            id={name}
            aria-invalid={Boolean(error)}
            checked={Boolean(field.value)}
            onCheckedChange={field.onChange}
          />
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
        </Field>
      )}
    />
  )
}
