"use client"

import LoadingScreen from "@/components/common/loading-screen"
import { useAuth } from "@/hooks/use-auth"
import { ReactNode } from "react"

// Auth state check layout
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  // To hide flash screen
  if (!user) {
    return <LoadingScreen message={"No user found! Redirecting ..."} />
  }

  // When user is not null
  // Render children
  return <div>{children}</div>
}
