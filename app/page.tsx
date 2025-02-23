import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WaitingList, WaitingListEntryForm } from "@/components/waiting-list";
import { waitingListEntries } from "@/lib/placeholder-data";

export default function Home() {
  return (
    <>
      <Card>
        <CardHeader>
          <Link href={"/?date=yesterday"}>
            <ChevronLeft />
          </Link>
          <CardTitle className="flex-10/12 text-center">Waiting List for #today</CardTitle>
          <Link href={"/?date=tomorrow"}>
            <ChevronRight />
          </Link>
        </CardHeader>
        <CardContent>
          <WaitingList entries={waitingListEntries} />
        </CardContent>
        <CardFooter>
          <WaitingListEntryForm />
        </CardFooter>
      </Card >
    </>
  );
}
