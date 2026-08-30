import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field"
import Proforma from "./proforma"

export default function Page() {
  return (
    <FieldSet>
      <FieldLegend>
        Audit for Quality of Antenatal Care of Central Women Hospital, Mandalay
      </FieldLegend>
      <FieldDescription>
        Retrosepctive and prospective mixed audit: Consecutive chart review of
        recent ANC visits supplemented by direct observation (one-day facility
        snapshot) and short interviews
      </FieldDescription>
      <Proforma />
    </FieldSet>
  )
}
