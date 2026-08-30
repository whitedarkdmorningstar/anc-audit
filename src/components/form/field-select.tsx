"use client"

import { Controller, useFormContext } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export type Option =
  | {
      label: string
      value: string | null
    }
  | string

interface FieldSelectProps {
  options: Option[]
  description?: string
  label: string
  name: string
}

export default function FieldSelect(props: FieldSelectProps) {
  const { options, label, description, name } = props
  const { control } = useFormContext()

  const items = [
    { label: `Select ${label}`, value: null },
    ...options.map((o) => (typeof o === "string" ? { label: o, value: o } : o)),
  ]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Field data-invalid={Boolean(error)}>
          <FieldLabel htmlFor={name} className="capitalize">
            {label}
          </FieldLabel>

          <Select
            value={field.value || null}
            items={items}
            onValueChange={field.onChange}
          >
            <SelectTrigger id={name} aria-invalid={Boolean(error?.message)}>
              <SelectValue className="capitalize" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="capitalize"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {description && <FieldDescription>{description}</FieldDescription>}
          {error?.message && <FieldError>{error.message}</FieldError>}
        </Field>
      )}
    />
  )
}
