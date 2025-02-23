'use server'
import { connect } from '@/lib/db';
import { WaitingListEntry } from '../lib/definitions';

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
