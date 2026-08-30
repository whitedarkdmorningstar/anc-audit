import { APP } from "@/constants/app"
import { PatientInfo, ProformaValue } from "@/constants/schema-proforma"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore"
import { auth, firestore } from "./firebase-config"

// Auth
export async function signOut() {
  await auth.signOut()
}

export async function signUp(
  email: string,
  password: string,
  displayName?: string
) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  if (displayName) {
    await updateProfile(user, { displayName })
  }
}

export async function signIn(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
}

// Proforma
export async function submitAsync(data: ProformaValue) {
  // Add main full data to proforma
  const value = {
    ...data,
    createdAt: serverTimestamp(),
  }
  await addDoc(collection(firestore, APP.PROFORMA_KEY), value)
}

export async function fetchDashboardDataAsync(
  userId: string
): Promise<PatientInfo[]> {
  const q = query(
    collection(firestore, APP.PROFORMA_KEY),
    where("auditorId", "==", userId)
  )

  const res = await getDocs(q)

  if (res.size === 0) return []

  // Add some data to patientInfo to access
  return res.docs.map((doc) => ({
    auditorId: doc.data().auditorId,
    patientId: doc.data().patientId,
    visitTimestamp: doc.data().visitTimestamp.toDate(),
    createdAt: doc.data().createdAt.toDate(),
    age: doc.data().age,
    gravita: doc.data().gravita,
    parity: doc.data().parity,
    maturity: doc.data().maturity,
    id: doc.id,
  })) as PatientInfo[]
}

export async function deleteProformaAsync(docId: string) {
  const docRef = doc(collection(firestore, APP.PROFORMA_KEY), docId)

  await deleteDoc(docRef)
}

export async function isPatientAlreadyExist(
  patientId: string
): Promise<boolean> {
  const q = query(
    collection(firestore, APP.PROFORMA_KEY),
    where("patientId", "==", patientId)
  )

  const res = await getDocs(q)

  return res.size > 0
}
