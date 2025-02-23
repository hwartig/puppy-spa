import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WaitingListEntry } from "@/lib/definitions";

export function WaitingList(props: { entries: WaitingListEntry[] }) {
  return (
    <Table>
      <TableHeader className="top-0 sticky bg-card">
        <TableRow>
          <TableHead className='w-1/12'>
            State
          </TableHead>
          <TableHead className='w-3/12'>
            Owner
          </TableHead>
          <TableHead className='w-3/12'>
            Pet
          </TableHead>
          <TableHead className='w-4/12'>
            Service
          </TableHead>
          <TableHead className='w-1/12'>
            Arrival
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.entries.map((entry) => (
          <WaitingListRow key={entry.number} entry={entry} />
        ))}
      </TableBody>
    </Table>
  );
}

export function WaitingListRow({ entry }: { entry: WaitingListEntry }) {
  const { id, owner_name, pet_name, arrival_time, state, service } = entry;

  return (
    <TableRow key={id} className={state != "waiting" ? "line-through opacity-30" : ""}>
      <TableCell>
        {state}
      </TableCell>
      <TableCell>
        {owner_name}
      </TableCell>
      <TableCell>
        {pet_name}
      </TableCell>
      <TableCell>
        {service}
      </TableCell>
      <TableCell>
        {arrival_time}
      </TableCell>
    </TableRow>
  )
}

