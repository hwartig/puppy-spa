import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
          {/* Table */}
        </CardContent>
        <CardFooter>
          {/* Form goes here */}
        </CardFooter>
      </Card >
    </>
  );
}
