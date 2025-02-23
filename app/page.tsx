import dayjs from 'dayjs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WaitingList } from "@/components/waiting-list";
import { WaitingListDND, WaitingListEntryForm } from "@/components/waiting-list-dnd";
import { fetchWaitingListEntries } from './actions';

export default async function Home({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let date = dayjs((await searchParams).date as string);
  if (!date.isValid()) {
    date = dayjs();
  }

  const dateStr = date.format("YYYY-MM-DD");
  const yesterday = date.subtract(1, "day").format("YYYY-MM-DD");
  const tomorrow = date.add(1, "day").format("YYYY-MM-DD");

  const entries = await fetchWaitingListEntries(dateStr);

  // we build this hash so we can force the WaitingList component to 
  // re-render when the entries change server side
  const entriesKey = entries[0]?.id +
    entries.length +
    entries.reduce((acc, entry) => acc + (entry.state == "waiting" ? 1 : 0), 0);

  return (
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
      {/* show new entry form only for current day */}
      {dateStr == dayjs().format("YYYY-MM-DD") ? (
        <>
          <CardContent>
            <WaitingListDND key={entriesKey} entries={entries} />
          </CardContent>
          <CardFooter>
            <WaitingListEntryForm />
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent>
            <WaitingList key={entriesKey} entries={entries} />
          </CardContent>
        </>
      )}
    </Card >
  );
}
