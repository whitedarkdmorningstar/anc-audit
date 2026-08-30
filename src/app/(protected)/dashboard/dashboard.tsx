"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { Marker, MarkerContent } from "@/components/ui/marker"
import { Spinner } from "@/components/ui/spinner"
import { APP, PATH } from "@/constants/app"
import { PatientInfo } from "@/constants/schema-proforma"
import { useProtectedAuth } from "@/hooks/use-auth"
import {
  deleteProformaAsync,
  fetchDashboardDataAsync,
  signOut,
} from "@/lib/firebase/utils"
import { formatDate } from "date-fns"
import { DiamondIcon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const { user } = useProtectedAuth()
  const [data, setData] = useState<PatientInfo[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const temp = await fetchDashboardDataAsync(user.uid)
      setData(temp)
    }
    fetchData()
  }, [user])

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Avatar>
            <AvatarFallback>
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>
          <b>{user.displayName}</b>
        </EmptyTitle>
        <EmptyDescription className={"min-w-sm"}>
          {data === null
            ? "Fetching your data ..."
            : data.length === 0
              ? "You have no collected data yet. Have one now?"
              : `You have collected ${data.length} data so far. Having one more?`}
        </EmptyDescription>
        <Button
          className={"absolute top-0 end-0 m-5"}
          variant={"outline"}
          onClick={signOut}
        >
          Sign Out
        </Button>
      </EmptyHeader>
      <EmptyContent>
        <Link href={PATH.CREATE_PROFORMA}>
          <Button>Add new data</Button>
        </Link>

        <Marker variant={"separator"} className={"my-4"}>
          <MarkerContent>
            <DiamondIcon />
          </MarkerContent>
        </Marker>

        <div className={"max-w-sm lg:min-w-3xl w-full"}>
          <EmptyTitle className={"mb-4"}>Your collected data</EmptyTitle>
          {data === null ? (
            <div className={"justify-center py-10 align-center flex"}>
              <Spinner className={"size-8"} />
            </div>
          ) : data.length === 0 ? (
            <EmptyDescription>No data</EmptyDescription>
          ) : (
            <div className={"gap-2 grid grid-cols-1 lg:grid-cols-2"}>
              {data.map((data) => (
                <AlertDialog key={data.id}>
                  <Item variant={"muted"} className={"cursor-pointer"}>
                    <ItemContent>
                      <ItemTitle>
                        {data.age} yr, G{data.gravita} P{data.parity} Maturity{" "}
                        {data.maturity.weeks}
                        {data.maturity.days
                          ? `+${data.maturity.days}`
                          : ""}{" "}
                        weeks
                      </ItemTitle>
                      <ItemDescription>
                        {formatDate(data.visitTimestamp, APP.DATE_FORMAT)}
                      </ItemDescription>
                    </ItemContent>
                    <AlertDialogTrigger>
                      <Trash2Icon />
                    </AlertDialogTrigger>
                  </Item>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You cannot recover the data after you have deleted this.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogCancel
                        onClick={() => {
                          // Delete from server
                          deleteProformaAsync(data.id)
                          // Remove proforma from list
                          setData((prev) =>
                            prev!.filter((e) => e.id !== data.id)
                          )
                        }}
                        variant={"default"}
                      >
                        Delete
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ))}
            </div>
          )}
        </div>
      </EmptyContent>
    </Empty>
  )
}
