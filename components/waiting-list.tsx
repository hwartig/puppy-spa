"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WaitingListEntry } from "../lib/definitions";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { updateWaitingListEntryState } from "@/app/actions";
import { createWaitingListEntry } from '@/app/actions';

export function WaitingList(props: { entries: WaitingListEntry[] }) {
  return (
    <Table>
      <TableHeader className="top-0 sticky bg-card">
        <TableRow>
          <TableHead className='w-1/12'>
            Priority
          </TableHead>
          <TableHead className='w-2/12'>
            State
          </TableHead>
          <TableHead className='w-3/12'>
            Owner
          </TableHead>
          <TableHead className='w-2/12'>
            Pet
          </TableHead>
          <TableHead className='w-3/12'>
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
  const { id, number, owner_name, pet_name, arrival_time, state, service } = entry;

  return (
    <TableRow key={number} className={state != "waiting" ? "line-through opacity-30" : ""}>
      <TableCell>
        {number}
      </TableCell>
      <TableCell>
        <StateCell id={id} state={state} />
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

export function WaitingListEntryForm() {
  return (
    <form action={createWaitingListEntry} className="flex w-full space-x-2">
      <Input type='text' name="owner_name" placeholder="Owner" />
      <Input type='text' name="pet_name" placeholder="Pet Name" />
      <Input type='text' name="service" placeholder="Service" />
      <Button type="submit">Add</Button>
    </form>
  );
}

export function StateCell({ id, state }: { id: string, state: string }) {
  if (state != 'waiting') {
    return (<Button variant="ghost" size="sm" onClick={() => updateWaitingListEntryState(id, "waiting")}>{state}</Button>);
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => updateWaitingListEntryState(id, "done")}>done</Button>
      <Button variant="ghost" size="sm" onClick={() => updateWaitingListEntryState(id, "left")}>left</Button>
    </>
  )
}
