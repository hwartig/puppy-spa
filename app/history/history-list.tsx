import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WaitingListEntry } from "@/lib/definitions";
import dayjs from 'dayjs';

export function HistoryList(props: { entries: WaitingListEntry[] }) {
  return (
    <Table>
      <TableHeader className="top-0 sticky bg-card">
        <TableRow>
          <TableHead className='w-1/12'>
            State
          </TableHead>
          <TableHead className='w-8/12'>
            Service
          </TableHead>
          <TableHead className='w-2/12'>
            Date
          </TableHead>
          <TableHead className='w-1/12'>
            Arrival
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.entries.map((entry) => (
          <HistoryListRow key={entry.id} entry={entry} />
        ))}
      </TableBody>
    </Table>
  );
}

export function HistoryListRow({ entry }: { entry: WaitingListEntry }) {
  const { date, arrival_time, state, service } = entry;

  return (
    <TableRow>
      <TableCell>
        {state}
      </TableCell>
      <TableCell>
        {service}
      </TableCell>
      <TableCell>
        {dayjs(date).format("DD. MMM YYYY")}
      </TableCell>
      <TableCell>
        {arrival_time}
      </TableCell>
    </TableRow>
  )
}
