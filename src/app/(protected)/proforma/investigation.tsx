"use client"

import { FieldCheckbox } from "@/components/form/field-checkbox"
import FieldCondition from "@/components/form/field-condition"
import { FieldInput } from "@/components/form/field-input"
import FieldSelect from "@/components/form/field-select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import {
  InvestigationsKey,
  investigationValues,
} from "@/constants/schema-investigations"

interface InvestigationProps {
  title?: string
  name: keyof InvestigationsKey
}

export default function Investigation({ title, name }: InvestigationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={"capitalize"}>{title || name}</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup className={"lg:grid lg:grid-cols-4"}>
          <FieldCondition label={"Offered"} name={`${name}.offered`}>
            <FieldCondition
              defaultRender={
                <FieldInput
                  label={"Reason for not done"}
                  name={`${name}.reason`}
                />
              }
              label={"Done"}
              name={`${name}.done`}
            >
              <FieldCheckbox label={"Documented"} name={`${name}.documented`} />
              {name === "haemogram" ? (
                <FieldInput
                  label={"Value"}
                  addOn={"mg/dL"}
                  name={`${name}.value`}
                  type={"number"}
                />
              ) : (
                <FieldSelect
                  label={"Value"}
                  options={investigationValues[name]}
                  name={`${name}.value`}
                />
              )}
            </FieldCondition>
          </FieldCondition>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
