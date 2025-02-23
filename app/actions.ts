'use server'
import { connect } from '@/lib/db';
import { WaitingListEntry } from '../lib/definitions';
import { revalidatePath } from 'next/cache';

const sql = connect();

export async function fetchWaitingListEntries(date: string) {
  try {
    return await sql<WaitingListEntry[]>`SELECT * FROM waiting_list_entries
        WHERE date = ${date} ORDER BY number ASC`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch WaitingListEntries.');
  }
}

export async function createWaitingListEntry(formData: FormData) {
  try {
    const numberRes = await sql`SELECT MAX(number) from waiting_list_entries where date = CURRENT_DATE`;
    const number = numberRes[0].max + 1;
    const ownerName = formData.get('owner_name') as string;
    const petName = formData.get('pet_name') as string;
    const service = formData.get('service') as string;

    await sql<WaitingListEntry[]>`
        INSERT INTO waiting_list_entries (number, owner_name, pet_name, service)
        VALUES (${number}, ${ownerName}, ${petName}, ${service})
        RETURNING *;
      `;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create WaitingListEntry.');
  }
  revalidatePath("/");
}

export async function updateWaitingListEntryState(id: string, state: string) {
  try {
    await sql`
      UPDATE waiting_list_entries
      SET state = ${state}
      WHERE id = ${id};
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update WaitingListEntry state.');
  }
  revalidatePath("/");
}


