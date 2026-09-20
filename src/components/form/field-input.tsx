import { isPatientAlreadyExist } from "@/lib/firebase/utils"
import { HTMLInputTypeAttribute, ReactNode } from "react"
import { useFormContext } from "react-hook-form"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { toast } from "../ui/toast"

type FieldInputProps = {
  label?: ReactNode
  description?: ReactNode
  addOn?: string
  addOnAlign?: "start" | "end"
  name: string
  type?: HTMLInputTypeAttribute
  disabled?: boolean
}

export function FieldInput(props: FieldInputProps) {
  const {
    label,
    disabled,
    description,
    addOn,
    addOnAlign = "end",
    name,
    type,
  } = props
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext()

  const onBlur = async (e: any) => {
    if (name !== "patientId") return

    const value = e.target.value.trim()

    if (!value) return

    const exists = await isPatientAlreadyExist(value)

    if (exists) {
      setError("patientId", {
        type: "manual",
        message: "This patient ID already exists",
      })
      const id = toast.add({
        title: "Duplicate Patient ID",
        description: "This patient ID already exists",
        actionProps: {
          children: "Close",
          onClick() {
            toast.close(id)
          },
        },
      })
    } else {
      clearErrors("patientId")
    }
  }

  return (
    <Field data-invalid={Boolean(errors[name])}>
      <FieldLabel className={label ? "" : "capitalize"} htmlFor={name}>
        {label || name}
      </FieldLabel>
      {addOn ? (
        <InputGroup>
          <InputGroupInput
            disabled={disabled}
            id={name}
            autoComplete="off"
            aria-invalid={Boolean(errors[name]?.message)}
            {...register(name, {
              valueAsNumber: type === "number",
              onBlur,
            })}
            type={type}
          />
          <InputGroupAddon
            align={addOnAlign === "start" ? "inline-start" : "inline-end"}
          >
            {addOn}
          </InputGroupAddon>
        </InputGroup>
      ) : (
        <Input
          id={name}
          autoComplete="off"
          disabled={disabled}
          type={type}
          aria-invalid={Boolean(errors[name]?.message)}
          {...register(name, { valueAsNumber: type === "number", onBlur })}
        />
      )}

      {Boolean(errors[name]?.message) ? (
        <FieldError>{errors[name]?.message as string}</FieldError>
      ) : (
        <FieldDescription>{description}</FieldDescription>
      )}
    </Field>
  )
}
