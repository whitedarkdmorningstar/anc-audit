"use client"

import LoadingScreen from "@/components/common/loading-screen"
import { useAuth } from "@/hooks/use-auth"
import { ReactNode } from "react"

// Auth state check layout
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  // To hide flash screen
  if (user) {
    return <LoadingScreen message={"Already sign in. Redirecting ..."} />
  }

  // When user is null
  // Render children
  return <div className={"py-32"}>{children}</div>
}
