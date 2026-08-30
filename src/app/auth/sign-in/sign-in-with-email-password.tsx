"use client"

import { FieldInput } from "@/components/form/field-input"
import FormError from "@/components/form/form-error"
import { Submit } from "@/components/form/submit"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import { PATH } from "@/constants/app"
import { errors as ERRORS } from "@/constants/schema-errors"
import { nonEmptyString } from "@/constants/schema-utils"
import { signIn } from "@/lib/firebase/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

const SignInSchema = z.object({
  email: z.email(ERRORS.email("Email")),
  password: nonEmptyString(ERRORS.nonEmpty("Password"), 6, 32),
})

type SignInValue = z.infer<typeof SignInSchema>

export default function SignInWithEmailPassword() {
  const methods = useForm<SignInValue>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
  })
  const router = useRouter()

  const onSubmit = async ({ email, password }: SignInValue) => {
    try {
      await signIn(email, password)
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
          <CardTitle className={"text-xl text-center"}>Sign In</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormError message={methods.formState.errors.root?.message} />
              <FieldInput name={"email"} />
              <FieldInput type={"password"} name={"password"} />
              <Submit
                disabled={!methods.formState.isValid}
                isSubmitting={methods.formState.isSubmitting}
                submitText={"Signing in ..."}
              >
                Sign In
              </Submit>
              <div className={"text-center"}>
                No account yet?{" "}
                <Link href={PATH.SIGN_UP} className={"text-link"}>
                  Create account
                </Link>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  )
}
