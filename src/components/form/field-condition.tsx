"use client"

import { ReactNode } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Checkbox } from "../ui/checkbox"
import { Field, FieldLabel } from "../ui/field"

export interface FieldConditionProps {
  children: ReactNode
  name: string
  label: string
  defaultRender?: ReactNode
}

export default function FieldCondition({
  children,
  name,
  label,
  defaultRender = null,
}: FieldConditionProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Field orientation="horizontal" data-invalid={Boolean(error)}>
            <Checkbox
              id={field.name}
              name={field.name}
              aria-invalid={Boolean(error)}
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
            />
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          </Field>
          {Boolean(field.value) ? children : defaultRender}
        </>
      )}
    />
  )
}
