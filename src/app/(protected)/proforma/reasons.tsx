import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { REASONS_FOR_MISSED_VISITS } from "@/constants/proforma"
import { Controller, useFormContext } from "react-hook-form"

export default function ReasonForMissedVisit() {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={"reasonForMissedVisit"}
      render={({ field }) => (
        <Card>
          <CardHeader>
            <CardTitle>Reasons for Missed/Late Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {REASONS_FOR_MISSED_VISITS.map((e) => (
                <Field key={e} orientation="horizontal">
                  <Checkbox
                    id={e}
                    name={e}
                    checked={field.value.includes(e)}
                    onCheckedChange={(checked) => {
                      if (Array.isArray(field.value)) {
                        const newArr = checked
                          ? [...field.value, e]
                          : field.value.filter((v) => v !== e)
                        return field.onChange(newArr)
                      }
                    }}
                  />
                  <FieldLabel htmlFor={e}>{e}</FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </CardContent>
        </Card>
      )}
    />
  )
}
