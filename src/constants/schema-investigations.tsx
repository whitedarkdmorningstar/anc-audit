import { z } from "zod"
import { RESULTS } from "./proforma"

/* ---------- Base test pattern ---------- */
const baseTest = z.object({
  offered: z.boolean(),
  done: z.boolean().optional(),
  reason: z.string().optional(),
  documented: z.boolean().optional(),
  action: z.string().optional(),
})

/* ---------- Urine protein ---------- */
const urineProteinSchema = baseTest.extend({
  value: z.enum(RESULTS.URINARY_PROTEIN).optional(),
})

/* ---------- Haemogram (Hb) ---------- */
const haemogramSchema = baseTest.extend({
  value: z.number().gt(0).optional(),
})

/* ---------- Blood group / Rh ---------- */
const bloodGroupSchema = baseTest.extend({
  value: z.enum(RESULTS.RHESUS).optional(),
})

/* ---------- HIV test ---------- */
const hivSchema = baseTest.extend({
  value: z.enum(RESULTS.SCREENING_TESTS).optional(),
})

/* ---------- Syphilis test ---------- */
const syphilisSchema = baseTest.extend({
  value: z.enum(RESULTS.SCREENING_TESTS).optional(),
})

/* ---------- Hepatitis B surface antigen ---------- */
const hbvSchema = baseTest.extend({
  value: z.enum(RESULTS.SCREENING_TESTS).optional(),
})

/* ---------- Hepatitis C antibody ---------- */
const hcvSchema = baseTest.extend({
  value: z.enum(RESULTS.SCREENING_TESTS).optional(),
})

/* ---------- OGTT Test -----------------*/
const ogttSchema = baseTest.extend({
  value: z.enum(RESULTS.OGTT).optional(),
})

/* ---------- Urine microscopy ---------- */
const urineMicroscopySchema = baseTest.extend({
  value: z.enum(RESULTS.URINE_MICROSCOPY).optional(),
})

/* ---------- Ultrasound ---------- */
const ultrasoundSchema = baseTest.extend({
  value: z.enum(RESULTS.ULTRASOUND).optional(),
})

/* ---------- Parent investigations schema ---------- */
export const investigationsSchema = z.object({
  urineProtein: urineProteinSchema,
  haemogram: haemogramSchema,
  bloodGroupRh: bloodGroupSchema,
  hiv: hivSchema,
  syphilis: syphilisSchema,
  hbv: hbvSchema,
  hcv: hcvSchema,
  urineMicroscopy: urineMicroscopySchema,
  ogtt: ogttSchema,
  ultrasound: ultrasoundSchema,
})
export type InvestigationsKey = z.infer<typeof investigationsSchema>

export const investigationValues: Record<keyof InvestigationsKey, string[]> = {
  urineProtein: RESULTS.URINARY_PROTEIN,
  bloodGroupRh: RESULTS.RHESUS,
  haemogram: RESULTS.HAEMOGRAM,
  hiv: RESULTS.SCREENING_TESTS,
  syphilis: RESULTS.SCREENING_TESTS,
  hbv: RESULTS.SCREENING_TESTS,
  hcv: RESULTS.SCREENING_TESTS,
  urineMicroscopy: RESULTS.URINE_MICROSCOPY,
  ogtt: RESULTS.OGTT,
  ultrasound: RESULTS.ULTRASOUND,
}
