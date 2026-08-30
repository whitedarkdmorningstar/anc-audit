import { AlertCircleIcon } from "lucide-react"
import { Alert, AlertTitle } from "../ui/alert"

export interface FormErrorProps {
  title?: string
  message?: string
}

export default function FormError(props: FormErrorProps) {
  if (!Boolean(props.message)) return null

  return (
    <Alert
      variant="destructive"
      className={"border-destructive bg-destructive/5"}
    >
      <AlertCircleIcon />
      <AlertTitle>{props.message || "Error"}</AlertTitle>
    </Alert>
  )
}
