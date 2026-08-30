import { Button } from "@/components/ui/button"
import {
  Step,
  StepAction,
  StepContent,
  StepDescription,
  StepHeader,
  StepTitle,
} from "@/components/ui/step"
import { ReactNode } from "react"
import { Submit } from "../form/submit"

export interface FormStepProps {
  title: string
  step: number
  currentStep: number
  description?: string
  onPrevious?: () => void
  children?: ReactNode
  isError?: boolean
  label?: string
  next?: string
  previous?: string
  submitText?: string
  isSubmitting?: boolean
}

export default function FormStep({
  title,
  description,
  step,
  isError,
  currentStep,
  onPrevious,
  children,
  label,
  next = "Next",
  previous = "Previous",
  isSubmitting,
  submitText = "Submitting ...",
}: FormStepProps) {
  return (
    <Step
      isActive={step === currentStep}
      isCollapsed={step !== currentStep}
      isError={currentStep > step && isError}
      isSuccess={currentStep > step && !isError}
    >
      <StepHeader step={label || step}>
        <StepTitle>{title}</StepTitle>
        <StepDescription>{description}</StepDescription>
      </StepHeader>
      <StepContent>
        {children}
        <StepAction>
          {step > 1 && (
            <Button onClick={onPrevious} variant={"outline"}>
              {previous}
            </Button>
          )}
          <Submit
            isSubmitting={isSubmitting}
            submitText={submitText}
            disabled={isError}
          >
            {next}
          </Submit>
        </StepAction>
      </StepContent>
    </Step>
  )
}
