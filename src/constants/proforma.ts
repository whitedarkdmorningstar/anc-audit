export const VISIT_TYPE = [
  "booking",
  "routine",
  "problem",
  "referral",
  "others",
]

export const RESULTS = {
  URINARY_PROTEIN: ["negative", "trace", "1+", "2+", "3+"],
  HAEMOGRAM: ["anaemia", "slight anaemia", "severe anaemia", "normal"],
  RHESUS: ["positive", "negative"],
  BLOOG_GROUP: ["A", "B", "AB", "O"],
  SCREENING_TESTS: ["negative", "positive", "indeterminate"],
  URINE_MICROSCOPY: ["normal", "abnormal"],
  OGTT: ["low", "normal", "high"],
  ULTRASOUND: ["normal", "abnormal"],
}

export const RATING = [
  "Not satisfied at all",
  "A little satisfied",
  "Moderate satisfied",
  "satisfied",
  "Totally satisfied",
]

export const REASONS_FOR_MISSED_VISITS = [
  "Transport difficulties",
  "Family problems",
  "Finicial problems",
  "Busy",
  "Think ANC is not important nor helpful",
  "Fear of hospitals or doctors",
  "Others",
] as const

export const COUNSELLINGS = [
  { label: "Danger Signs", name: "counselling.dangerSigns" },
  { label: "Nutrition", name: "counselling.nutrition" },
  { label: "Birth Preparedness", name: "counselling.birthPreparedness" },
  { label: "Family Planning", name: "counselling.familyPlanning" },
  { label: "Breast Feeding", name: "counselling.breastFeeding" },
]

export const PREVENTIVE_MEASURES = [
  { label: "Iron & Folic Acid", name: "ironFolicAcid" },
  { label: "ATT Injection", name: "attInjection" },
  { label: "Deworming", name: "deworming" },
  { label: "Rh Immunoglobulin", name: "rhIg" },
]

export const BASIC_PRINCIPLE = [
  { label: "Patient's Privacy", name: "patientPrivacy" },
  { label: "Time For Questions", name: "timeForQuestions" },
  { label: "Language Difficulty", name: "languageDifficulty" },
]

export const VISITS = [
  {
    label: "At Least One Visit In First Trimester",
    name: "atLeastOneVisitInFirstTrimester",
  },
  {
    label: "At Least Two Visits In Second Trimester",
    name: "atLeastTwoVisitsInSecondTrimester",
  },
  {
    label: "At Least Five Visits In Third Trimester",
    name: "atLeastFiveVisitsInThirdDTrimester",
  },
]
