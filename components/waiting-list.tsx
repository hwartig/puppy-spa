import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WaitingListEntry } from "../lib/definitions";

export function WaitingList(props: { entries: WaitingListEntry[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Number
          </TableHead>
          <TableHead>
            Owner
          </TableHead>
          <TableHead>
            Pet
          </TableHead>
          <TableHead>
            Service
          </TableHead>
          <TableHead>
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
  const { number, owner_name, pet_name, arrival_time, service } = entry;

  return (
    <TableRow key={number}>
      <TableCell>
        {number}
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
