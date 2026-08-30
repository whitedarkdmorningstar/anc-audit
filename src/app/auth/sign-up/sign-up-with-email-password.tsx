"use client"

import { FieldInput } from "@/components/form/field-input"
import FormError from "@/components/form/form-error"
import { Submit } from "@/components/form/submit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import { PATH } from "@/constants/app"
import { errors as ERRORS } from "@/constants/schema-errors"
import { nonEmptyString } from "@/constants/schema-utils"
import { signUp } from "@/lib/firebase/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

const SignInSchema = z
  .object({
    email: z.email(ERRORS.email("Email")),
    password: nonEmptyString(ERRORS.nonEmpty("Password"), 6, 32),
    confirmPassword: z.string(),
    username: nonEmptyString(ERRORS.nonEmpty("Username"), 6, 32),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

type SignInValue = z.infer<typeof SignInSchema>

export default function SignUpWithEmailPassword() {
  const methods = useForm<SignInValue>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
  })
  const router = useRouter()

  const onSubmit = async ({ email, password, username }: SignInValue) => {
    try {
      await signUp(email, password, username)
      // Go to dashboard
      router.replace(PATH.DASHBOARD)
    } catch (error: unknown) {
      // Error
      methods.setError("root", {
        message: ERRORS.error(error),
      })
    }
  }

  return (
    <FormProvider {...methods}>
      <Card className={"max-w-md w-full mx-auto"}>
        <CardHeader>
          <CardTitle className={"text-xl text-center"}>
            Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormError message={methods.formState.errors.root?.message} />
              <FieldInput name={"username"} />
              <FieldInput name={"email"} type={"email"} />
              <FieldInput type={"password"} name={"password"} />
              <FieldInput
                label={"Confirm Password"}
                type={"password"}
                name={"confirmPassword"}
              />

              <Submit
                disabled={!methods.formState.isValid}
                isSubmitting={methods.formState.isSubmitting}
                submitText={"Creating ..."}
              >
                Create
              </Submit>
              <div className={"text-center"}>
                Already have an account?{" "}
                <Link href={PATH.SIGN_IN} className={"text-link"}>
                  Sign in
                </Link>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  )
}
