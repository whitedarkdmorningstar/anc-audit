import { cn } from "@/lib/utils"
import { ButtonProps } from "@base-ui/react"
import { LoaderCircleIcon } from "lucide-react"
import { Button } from "../ui/button"

export interface SubmitProps extends ButtonProps {
  submitText?: string
  isSubmitting?: boolean
}

export function Submit({ submitText, isSubmitting, ...props }: SubmitProps) {
  return (
    <Button
      type={"submit"}
      {...props}
      disabled={isSubmitting || props.disabled}
      className={cn(props.className)}
    >
      {isSubmitting ? (
        <>
          <LoaderCircleIcon className={"animate-spin"} />
          {submitText || props.children}
        </>
      ) : (
        props.children
      )}
    </Button>
  )
}
