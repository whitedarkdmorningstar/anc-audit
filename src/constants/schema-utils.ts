import { z } from "zod"
import { errors } from "./schema-errors"

export const nonEmptyString = (
  label: string = "Input",
  min = 1,
  max?: number
) => {
  const s = z
    .string(errors.string(label))
    .min(min, min > 1 ? errors.minLength(label, min) : errors.nonEmpty(label))

  if (max) {
    if (min === max) {
      return z
        .string(errors.string(label))
        .min(min, errors.exactLength(label, min))
        .max(max, errors.exactLength(label, max))
    }
    return s.max(max, errors.maxLength(label, max))
  }

  return s
}

export const positiveInt = (label: string = "Input", min = 0, max?: number) => {
  const n = z
    .number(errors.number(label))
    .min(min, errors.minNumber(label, min))
    .int(errors.integer(label))

  if (max) {
    return n.max(max, errors.maxNumber(label, max))
  }

  return n
}
