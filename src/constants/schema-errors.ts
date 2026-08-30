// Centralized error messages
export const errors = {
  string: (field: string) => `${field} must be text`,
  required: (field: string) => `${field} is required`,
  nonEmpty: (field: string) => `${field} should not be empty`,

  // String validations
  minLength: (field: string, min: number) =>
    `${field} must be at least ${min} characters long`,
  maxLength: (field: string, max: number) =>
    `${field} must be at most ${max} characters long`,
  exactLength: (field: string, len: number) =>
    `${field} must be exactly ${len} characters long`,

  // Number validations
  number: (field: string) => `${field} must be number`,
  positive: (field: string) => `${field} must be a positive number`,
  negative: (field: string) => `${field} must be a negative number`,
  nonZero: (field: string) => `${field} must not be zero`,
  integer: (field: string) => `${field} must be an integer`,
  decimal: (field: string) => `${field} must be a decimal number`,
  minNumber: (field: string, min: number) =>
    `${field} must be greater than or equal to ${min}`,
  maxNumber: (field: string, max: number) =>
    `${field} must be less than or equal to ${max}`,

  // Pattern validations
  digitsOnly: (field: string) => `${field} must contain only digits`,
  lettersOnly: (field: string) => `${field} must contain only letters`,
  alphanumeric: (field: string) =>
    `${field} must contain only letters and digits`,
  regex: (field: string, desc: string) =>
    `${field} must match pattern: ${desc}`,

  // Common formats
  email: (field: string) => `${field} must be a valid email address`,
  url: (field: string) => `${field} must be a valid URL`,
  enum: (field: string) => `${field} must be selected from options`,

  // Date validations
  date: (field: string) => `${field} must be a valid date`,
  futureDate: (field: string) => `${field} must be a future date`,
  pastDate: (field: string) => `${field} must be a past date`,

  // Unknown
  error: (error: unknown) =>
    error instanceof Error ? error.message : "An unknown error occurred.",
}
