import { ReactNode } from "react"
import { useFormContext } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { Textarea } from "../ui/textarea"

type FieldInputProps = {
  label?: ReactNode
  description?: ReactNode
  name: string
}

export function FieldInput(props: FieldInputProps) {
  const { label, description, name } = props
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Field data-invalid={Boolean(errors[name])}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Textarea
        id={name}
        autoComplete="off"
        aria-invalid={Boolean(errors[name]?.message)}
        {...register(name)}
      />

      {Boolean(errors[name]?.message) ? (
        <FieldError>{errors[name]?.message as string}</FieldError>
      ) : (
        <FieldDescription>{description}</FieldDescription>
      )}
    </Field>
  )
}
