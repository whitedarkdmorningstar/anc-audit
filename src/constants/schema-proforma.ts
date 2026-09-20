import { z } from "zod"
import { REASONS_FOR_MISSED_VISITS, VISIT_TYPE } from "./proforma"
import { errors } from "./schema-errors"
import { investigationsSchema } from "./schema-investigations"
import { nonEmptyString, positiveInt } from "./schema-utils"

export const ProformaSchema = z.object({
  // Metadata
  auditorId: nonEmptyString(),
  patientId: nonEmptyString(),
  visitType: z.enum(VISIT_TYPE),
  visitTimestamp: z.date(),
  // Patient
  age: positiveInt("Age", 9, 60),
  height: z.object({
    feet: positiveInt("Feet", 3, 8),
    inches: positiveInt("Inches", 0, 11),
  }),
  weight: positiveInt("Weight", 40, 400),
  gravita: positiveInt("Gravita", 1, 20),
  parity: nonEmptyString("Parity", 1, 5).regex(
    /^(0|[0-9]{1,2}\+[0-9]{1,2})$/,
    errors.regex("Parity", "0 or digit+digit")
  ),
  maturity: z.object({
    weeks: positiveInt("Weeks", 1, 45),
    days: positiveInt("Days", 0, 6),
  }),
  atLeastOneVisitInFirstTrimester: z.boolean(),
  atLeastTwoVisitsInSecondTrimester: z.boolean().optional(),
  atLeastFiveVisitsInThirdDTrimester: z.boolean().optional(),
  reasonForMissedVisit: z.array(z.enum(REASONS_FOR_MISSED_VISITS)).optional(),
  bloodPressure: z.object({
    measured: z.boolean(),
    systolic: positiveInt("SBP", 1, 360).optional(),
    diastolic: positiveInt("DBP", 0, 160).optional(),
  }),
  // Investigations
  ...investigationsSchema.shape,
  // Preventive measures
  ironFolicAcid: z.boolean(),
  attInjection: z.boolean(), // after 24 weeks
  deworming: z.boolean(), // after 1st trimester
  rhIg: z.boolean(), // after 28 weeks
  // Principle
  patientPrivacy: z.boolean(),
  timeForQuestions: z.boolean(),
  languageDifficulty: z.boolean(),
  // Counselling
  risk: z.object({
    identified: z.boolean(),
    conditions: z.string().optional(),
    identifiedDate: z.string().optional(),
    management: z
      .object({
        plan: z.string(),
        date: z.string(),
      })
      .optional(),
    refrral: z
      .object({
        specialities: z.string(),
        date: z.string(),
      })
      .optional(),
  }),
  counselling: z.object({
    dangerSigns: z.boolean(),
    nutrition: z.boolean(),
    birthPreparedness: z.boolean(),
    familyPlanning: z.boolean(),
    breastFeeding: z.boolean(),
  }),
  rating: positiveInt("Rating", 0, 5),
})

export type ProformaValue = z.infer<typeof ProformaSchema>

export interface PatientInfo {
  id: string
  auditorId: string
  patientId: string
  visitTimestamp: Date
  createdAt: any
  age: number
  gravita: number
  parity: string
  maturity: { weeks: number; days: number }
}

const baseTestDefault = {
  offered: true,
  done: false,
  documented: false,
}

export const DEFAULT_PROFORMA = {
  // Metadata
  auditorId: "",
  // patientId: getId(),
  visitType: VISIT_TYPE[1],
  visitTimestamp: new Date(),

  // Patient
  // age: 18,
  height: { feet: 5, inches: 0 },
  // weight: 60,
  // maturity: { weeks: 12, days: 0 },
  atLeastOneVisitInFirstTrimester: false,
  atLeastTwoVisitsInSecondTrimester: false,
  atLeastFiveVisitsInThirdDTrimester: false,
  reasonForMissedVisit: [],

  bloodPressure: {
    measured: true,
  },

  // Investigations
  urineProtein: baseTestDefault,
  haemogram: baseTestDefault,
  bloodGroupRh: baseTestDefault,
  hiv: baseTestDefault,
  syphilis: baseTestDefault,
  hbv: baseTestDefault,
  hcv: baseTestDefault,
  urineMicroscopy: baseTestDefault,
  ogtt: baseTestDefault,
  ultrasound: baseTestDefault,

  // Preventive measures
  ironFolicAcid: true,
  attInjection: true,
  deworming: true,
  rhIg: false,

  // Principle
  patientPrivacy: false,
  timeForQuestions: false,
  languageDifficulty: false,

  // Counselling
  risk: {
    identified: false,
  },
  counselling: {
    dangerSigns: true,
    nutrition: true,
    birthPreparedness: true,
    familyPlanning: true,
    breastFeeding: true,
  },
  rating: 0,
}
