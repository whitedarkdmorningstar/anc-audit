import { Metadata } from "next"
import SignInWithEmailPassword from "./sign-in-with-email-password"

export const metadata: Metadata = {
  title: "ANC Audit | Sign In",
}

export default function Page() {
  return <SignInWithEmailPassword />
}
