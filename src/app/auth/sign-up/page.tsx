import { Metadata } from "next"
import SignUpWithEmailPassword from "./sign-up-with-email-password"

export const metadata: Metadata = {
  title: "ANC Audit | Create account",
}

export default function Page() {
  return <SignUpWithEmailPassword />
}
