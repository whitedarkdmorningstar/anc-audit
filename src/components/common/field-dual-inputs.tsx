import { HTMLInputTypeAttribute } from "react"
import { useFormContext } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group"

export interface FieldDualInputsProps {
  firstLabel: string
  secondLabel?: string // Only required when variant is "split"
  description?: string
  separator?: string // Used for "unified" variant (e.g. "/")
  firstAddOn?: string
  secondAddOn?: string
  firstType?: HTMLInputTypeAttribute
  secondType?: HTMLInputTypeAttribute
  firstPlaceholder?: string
  secondPlaceholder?: string
  names: [string, string]
}

export default function FieldDualInputs({
  firstLabel,
  secondLabel,
  description,
  separator,
  firstPlaceholder,
  secondPlaceholder,
  firstAddOn,
  secondAddOn,
  firstType,
  names,
  secondType,
}: FieldDualInputsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const first = names[0]
  const second = names[1]
  const combinedErrorMessage = errors[first]?.message || errors[second]?.message
  const hasFirstError = Boolean(errors[first]?.message)
  const hasSecondError = Boolean(errors[second]?.message)
  const hasError = Boolean(combinedErrorMessage)

  return (
    <div className="w-full">
      {Boolean(separator) ? (
        /* ================= UNIFIED VARIANT (e.g., Blood Pressure 120/80) ================= */
        <Field data-invalid={hasError}>
          <FieldLabel htmlFor={first}>{firstLabel}</FieldLabel>
          <InputGroup aria-invalid={hasError}>
            {firstAddOn && (
              <InputGroupAddon align="inline-start">
                <InputGroupText>{firstAddOn}</InputGroupText>
              </InputGroupAddon>
            )}

            <InputGroupInput
              placeholder={firstPlaceholder}
              id={first}
              aria-invalid={hasFirstError}
              {...register(first, { valueAsNumber: firstType === "number" })}
              type={firstType}
            />

            {separator && (
              <InputGroupText className="px-2 select-none text-muted-foreground">
                {separator}
              </InputGroupText>
            )}

            <InputGroupInput
              id={second}
              placeholder={secondPlaceholder}
              aria-invalid={hasSecondError}
              {...register(second, { valueAsNumber: secondType === "number" })}
              type={secondType}
            />

            {secondAddOn && (
              <InputGroupAddon align="inline-end">
                <InputGroupText>{secondAddOn}</InputGroupText>
              </InputGroupAddon>
            )}
          </InputGroup>
        </Field>
      ) : (
        <div className="flex flex-row items-start gap-2">
          {/* First Input Column */}
          <Field
            data-invalid={secondLabel ? hasFirstError : hasError}
            className="flex-1"
          >
            <FieldLabel htmlFor={first}>{firstLabel}</FieldLabel>
            <InputGroup aria-invalid={hasFirstError}>
              <InputGroupInput
                type={firstType}
                aria-invalid={hasFirstError}
                placeholder={firstPlaceholder}
                id={first}
                {...register(first, { valueAsNumber: firstType === "number" })}
              />
              {firstAddOn && (
                <InputGroupAddon align="inline-end">
                  <InputGroupText>{firstAddOn}</InputGroupText>
                </InputGroupAddon>
              )}
            </InputGroup>
          </Field>

          <Field data-invalid={hasSecondError} className="flex-1">
            <FieldLabel htmlFor={second}>{secondLabel || "\u00A0"} </FieldLabel>
            <InputGroup aria-invalid={hasSecondError}>
              <InputGroupInput
                id={second}
                type={secondType}
                placeholder={secondPlaceholder}
                aria-invalid={hasSecondError}
                {...register(second, {
                  valueAsNumber: secondType === "number",
                })}
              />
              {secondAddOn && (
                <InputGroupAddon align="inline-end">
                  <InputGroupText>{secondAddOn}</InputGroupText>
                </InputGroupAddon>
              )}
            </InputGroup>
          </Field>
        </div>
      )}

      {hasError ? (
        <FieldError>{combinedErrorMessage as string}</FieldError>
      ) : (
        description && <FieldDescription>{description}</FieldDescription>
      )}
    </div>
  )
}
