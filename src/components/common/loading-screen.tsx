import {
  Dialog,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"

export default function LoadingScreen({
  isOpen = true,
  message,
}: {
  isOpen?: boolean
  message?: string
}) {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen}>
      <DialogPortal>
        <DialogOverlay
          className={"flex gap-3 items-center justify-center flex-col"}
        >
          <Spinner className={"size-10"} />
          <DialogHeader>
            <DialogTitle>{message}</DialogTitle>
          </DialogHeader>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  )
}
