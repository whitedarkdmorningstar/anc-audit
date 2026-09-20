"use client"

import FieldDualInputs from "@/components/common/field-dual-inputs"
import { FieldCheckbox } from "@/components/form/field-checkbox"
import FieldCondition from "@/components/form/field-condition"
import FieldDateInput from "@/components/form/field-date-input"
import { FieldInput } from "@/components/form/field-input"
import FieldSelect from "@/components/form/field-select"
import { Submit } from "@/components/form/submit"
import { FieldGroup } from "@/components/ui/field"
import { PATH } from "@/constants/app"
import {
  BASIC_PRINCIPLE,
  COUNSELLINGS,
  PREVENTIVE_MEASURES,
  VISIT_TYPE,
  VISITS,
} from "@/constants/proforma"
import {
  DEFAULT_PROFORMA,
  ProformaSchema,
  ProformaValue,
} from "@/constants/schema-proforma"
import { useProtectedAuth } from "@/hooks/use-auth"
import { submitAsync } from "@/lib/firebase/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import Investigation from "./investigation"
import Rating from "./rating"
import ReasonForMissedVisit from "./reasons"
import Section from "./section"

export default function Proforma() {
  const { user } = useProtectedAuth()
  const methods = useForm<ProformaValue>({
    resolver: zodResolver(ProformaSchema),
    defaultValues: { ...DEFAULT_PROFORMA, auditorId: user.uid },
    shouldFocusError: true,
    mode: "onSubmit",
  })

  const bp = methods.watch("bloodPressure.measured")

  useEffect(() => {
    if (!bp) {
      methods.unregister("bloodPressure.diastolic")
      methods.unregister("bloodPressure.systolic")
    }
  }, [bp])

  const renderCheckbox = useCallback(
    (e: { label: string; name: string }) => (
      <FieldCheckbox {...e} key={e.name} />
    ),
    []
  )

  const router = useRouter()
  const onSubmit = async (value: ProformaValue) => {
    const { success } = ProformaSchema.safeParse(value)
    if (success) {
      await submitAsync(value)
      // Check if current patient id is already submited
      router.push(PATH.DASHBOARD)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Section
            title={"Metadata"}
            className={"grid grid-cols-2 lg:grid-cols-4"}
          >
            <FieldInput disabled label={"Auditor Id"} name={"auditorId"} />
            <FieldInput label={"Patient Id"} name={"patientId"} />
            <FieldDateInput label={"Vist Date"} name={"visitTimestamp"} />
            <FieldSelect
              options={VISIT_TYPE}
              name={"visitType"}
              label={"Visit Type"}
            />
          </Section>

          <Section
            title={"Patient's Demographic"}
            className={"grid grid-cols-2 lg:grid-cols-4"}
          >
            <FieldInput name={"age"} type={"number"} addOn={"years"} />
            <FieldInput name={"weight"} type={"number"} addOn={"lb"} />

            <FieldInput
              label={"Height (feet)"}
              addOn={"ft"}
              name={"height.feet"}
              type={"number"}
            />
            <FieldInput
              label={"Height (inches)"}
              addOn={"in"}
              name={"height.inches"}
              type={"number"}
            />

            <FieldInput name={"gravita"} type={"number"} />
            <FieldInput name={"parity"} />
            <FieldInput
              label={"Maturity (weeks)"}
              addOn={"weeks"}
              name={"maturity.weeks"}
              type={"number"}
            />
            <FieldInput
              label={"Maturity (days)"}
              addOn={"days"}
              name={"maturity.days"}
              type={"number"}
            />
          </Section>

          <Section
            title={"Blood Pressure"}
            className={"lg:grid lg:grid-cols-2"}
          >
            <FieldCondition
              name={"bloodPressure.measured"}
              label={"Did BP measured?"}
            >
              <FieldDualInputs
                firstLabel="Measurement"
                firstPlaceholder="SBP"
                secondPlaceholder="DBP"
                firstType="number"
                secondType={"number"}
                separator="/"
                secondAddOn="mmHg"
                names={["bloodPressure.systolic", "bloodPressure.diastolic"]}
              />
            </FieldCondition>
          </Section>

          <Investigation name={"urineProtein"} title={"Urine Protein"} />
          <Investigation name={"haemogram"} />
          <Investigation name={"bloodGroupRh"} title={"Blood Grouping & Rh"} />
          <Investigation name={"hiv"} title={"HIV"} />
          <Investigation name={"syphilis"} />
          <Investigation name={"hbv"} title={"HBsAg"} />
          <Investigation name={"hcv"} title={"HCV"} />
          <Investigation name={"urineMicroscopy"} title={"Urine Microscopy"} />
          <Investigation name={"ultrasound"} />

          <Section title={"Visits"}>{VISITS.map(renderCheckbox)}</Section>

          <ReasonForMissedVisit />

          <Section title={"Preventive Measures"}>
            {PREVENTIVE_MEASURES.map(renderCheckbox)}
          </Section>

          <Section title={"Principle"}>
            {BASIC_PRINCIPLE.map(renderCheckbox)}
          </Section>

          <Section title={"Counsellings"}>
            {COUNSELLINGS.map(renderCheckbox)}
          </Section>

          <Rating />

          <Submit
            isSubmitting={methods.formState.isSubmitting}
            submitText={"Submitting ..."}
            disabled={!methods.formState.isValid}
          >
            Submit
          </Submit>
        </FieldGroup>
      </form>
    </FormProvider>
  )
}
