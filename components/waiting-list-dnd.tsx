"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WaitingListEntry } from "../lib/definitions";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { updateWaitingListEntryOrder, updateWaitingListEntryState } from "@/app/actions";
import { createWaitingListEntry } from '@/app/actions';
import { GripHorizontal } from 'lucide-react';
import { useState } from 'react';

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

export function WaitingListDND(props: { entries: WaitingListEntry[] }) {
  // const entries = props.entries;
  const [entries, setEntries] = useState(props.entries);
  const [numbers, setNumbers] = useState(props.entries.map(e => e.id));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over != null && active.id !== over.id) {
      const oldIndex = numbers.indexOf(active.id as string);
      const newIndex = numbers.indexOf(over.id as string);

      updateWaitingListEntryOrder(entries[oldIndex], newIndex + 1);

      setNumbers((items) => arrayMove(items, oldIndex, newIndex));
      setEntries(entries => {
        return arrayMove(entries, oldIndex, newIndex).map((entry, index) => {
          entry.number = index + 1;
          return entry;
        });
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={numbers}
        strategy={verticalListSortingStrategy}
      >
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
            {entries.map((entry) => (
              <WaitingListRowDND key={entry.number} entry={entry} />
            ))}
          </TableBody>
        </Table>
      </SortableContext>
    </DndContext>
  );
}

export function WaitingListRowDND({ entry }: { entry: WaitingListEntry }) {
  const { id, owner_name, pet_name, arrival_time, state, service } = entry;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} key={id} className={state != "waiting" ? "line-through opacity-30" : ""} style={style}>
      <TableCell>
        <Button
          variant={"ghost"}
          size={"sm"}
          {...attributes}
          {...listeners}
          className="cursor-grab"
        >
          <GripHorizontal />
        </Button>
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
