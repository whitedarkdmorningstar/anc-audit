import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StarIcon } from "lucide-react"
import { Controller, useFormContext } from "react-hook-form"
import Section from "./section"

export default function Rating() {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={"rating"}
      render={({ field }) => (
        <Section
          title={"Rating"}
          className={"flex flex-row items-center justify-center"}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Button
              key={i}
              size={"icon-lg"}
              onClick={() => field.onChange(i + 1)}
              variant={"ghost"}
            >
              <StarIcon
                className={cn(
                  "size-8",
                  field.value >= i + 1 && "fill-current text-primary"
                )}
              />
            </Button>
          ))}
        </Section>
      )}
    />
  )
}
