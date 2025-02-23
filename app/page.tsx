import dayjs from 'dayjs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WaitingList, WaitingListEntryForm } from "@/components/waiting-list";
import { waitingListEntries } from "@/lib/placeholder-data";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let date = dayjs((await searchParams).date as string);
  if (!date.isValid()) {
    date = dayjs();
  }

  const yesterday = date.subtract(1, "day").format("YYYY-MM-DD");
  const tomorrow = date.add(1, "day").format("YYYY-MM-DD");

  return (
    <>
      <Card>
        <CardHeader>
          <Link href={"/?date=" + yesterday}>
            <ChevronLeft />
          </Link>
          <CardTitle className="flex-10/12 text-center">Waiting List for {date.format("DD. MMM YYYY")}</CardTitle>
          {/* show next button only if it's not in the future */}
          {date.add(1, "day") <= dayjs() &&
            <Link href={"/?date=" + tomorrow}>
              <ChevronRight />
            </Link>
          }
        </CardHeader>
        <CardContent>
          <WaitingList entries={waitingListEntries} />
        </CardContent>
        <CardFooter>
          {/* show new entry form only for current day */}
          {date.format("YYYY-MM-DD") == dayjs().format("YYYY-MM-DD") && (
            <WaitingListEntryForm />
          )}
        </CardFooter>
      </Card >
    </>
  );
}
