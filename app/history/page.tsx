import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchWaitingListEntriesForPet } from "@/app/actions";
import { HistoryList } from './history-list';

export default async function Home({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const owner_name = params.owner_name as string;
  const pet_name = params.pet_name as string;

  const entries = await fetchWaitingListEntriesForPet(owner_name, pet_name);

  return (
    <Card>
      <CardHeader>
        <CardTitle>History for {pet_name} / {owner_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <HistoryList entries={entries} />
      </CardContent>
    </Card >
  );
}

