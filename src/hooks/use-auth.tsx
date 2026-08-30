"use client"

import LoadingScreen from "@/components/common/loading-screen"
import { PATH } from "@/constants/app"
import { auth } from "@/lib/firebase/firebase-config"
import { onAuthStateChanged, User } from "firebase/auth"
import { usePathname, useRouter } from "next/navigation"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

type AuthContextValue = {
  user: User
}

const authContext = createContext<AuthContextValue | null>(null)

// Auth context provider to wrap the app
export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const isAuth = usePathname().startsWith("/auth")

  // Add auth state change listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If user is found in auth path,
        // redirect to dashboard
        isAuth && router.replace(PATH.DASHBOARD)
      } else {
        // Where no user found, redirect to auth sign in
        router.replace(PATH.SIGN_IN)
      }
      setUser(currentUser)
      // Finally, loading is false
      setLoading(false)
    })

    // Clean up function
    return () => unsub()
  }, [isAuth])

  // Value to pass through provider
  // User may be null here, but will not be null in protected routes
  // We will use protected guard route
  const value = { user } as AuthContextValue

  return (
    <authContext.Provider value={value}>
      {/** Show loading screen */}
      {loading ? (
        <LoadingScreen message={"Checking user info ..."} />
      ) : (
        children
      )}
    </authContext.Provider>
  )
}

// Unprotected auth
export function useAuth(): { user: User | null } {
  const ctx = useContext(authContext)

  if (!ctx) {
    throw new Error("useAuth must be used within AuthContextProvider")
  }

  return ctx
}

// Protected auth
// user will never be null
export function useProtectedAuth(): AuthContextValue {
  const ctx = useAuth()

  if (!ctx.user) {
    throw new Error(
      "useProtectedAuth must be used withint protected routes: `/(protected)/*`"
    )
  }

  return ctx as AuthContextValue
}
