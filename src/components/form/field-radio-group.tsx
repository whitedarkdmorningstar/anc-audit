import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Controller, useFormContext } from "react-hook-form"

type RadioGroupItemType =
  | string
  | {
      id?: string
      value: string
      label?: string
      description?: string
      className?: string
      disabled?: boolean
    }

export interface FieldRadioGroupProps {
  options: RadioGroupItemType[]
  name: string
}

export function FieldRadioGroup({ options, name }: FieldRadioGroupProps) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <RadioGroup onValueChange={field.onChange} value={field.value}>
          {options.map((item, index) =>
            typeof item === "string" ? (
              <div
                className="flex items-center gap-3"
                key={item + index.toString()}
              >
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className={"capitalize"}>
                  {item}
                </Label>
              </div>
            ) : (
              <Field
                orientation="horizontal"
                data-disabled={item?.disabled}
                className={item?.className}
                key={item.value + index.toString()}
              >
                <RadioGroupItem
                  disabled={item.disabled}
                  value={item.value}
                  id={item?.id || item.value}
                />
                <FieldContent>
                  <FieldLabel
                    className={"capitalize"}
                    htmlFor={item?.id || item.value}
                    aria-disabled={item.disabled}
                  >
                    {item?.label || item.value}
                  </FieldLabel>
                  <FieldDescription>{item.description}</FieldDescription>
                </FieldContent>
              </Field>
            )
          )}
        </RadioGroup>
      )}
    />
  )
}
