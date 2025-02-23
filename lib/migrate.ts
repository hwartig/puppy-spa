import postgres from 'postgres';
import dayjs from 'dayjs';

import { waitingListEntries, petNames, ownerNames, services } from './placeholder-data.ts';

const sql = postgres(process.env.POSTGRES_URL!);

async function createWaitingListTable(sql: postgres.TransactionSql<{}>) {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
  await sql`DROP TABLE IF EXISTS waiting_list_entries;`;
  await sql`
    CREATE TABLE IF NOT EXISTS waiting_list_entries (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      date DATE default CURRENT_DATE,
      arrival_time TIME default CURRENT_TIME(0),
      number INT NOT NULL,
      owner_name VARCHAR(255) NOT NULL,
      pet_name VARCHAR(255) NOT NULL,
      service VARCHAR(255),
      state VARCHAR(20) DEFAULT 'waiting'
    );
  `;
  await sql`CREATE INDEX waiting_list_entries_date_index ON waiting_list_entries (date);`;
  await sql`CREATE INDEX waiting_list_entries_names_index ON waiting_list_entries (owner_name, pet_name);`;

}

async function seedWaitingList(sql: postgres.TransactionSql<{}>) {
  const entries = waitingListEntries.map((entry) => {
    return {
      ...entry,
      date: dayjs().format('YYYY-MM-DD'),
      state: 'waiting',
    }
  })

  for (let days = 1; days < 30; days++) {
    for (let i = 0; i < 50; i++) {
      entries.push({
        date: dayjs().subtract(days, 'day').format('YYYY-MM-DD'),
        number: i,
        arrival_time: `10:${i}:${Math.floor(Math.random() * 60)}`,
        owner_name: ownerNames[Math.floor(Math.random() * ownerNames.length)],
        pet_name: petNames[Math.floor(Math.random() * petNames.length)],
        service: services[Math.floor(Math.random() * services.length)],
        state: ["done", "left"][Math.round(Math.random())],
      });
    }
  }

  const insertedWaitingListEntries = await Promise.all(
    entries.map(async (entry) => {
      return sql`
        INSERT INTO waiting_list_entries (date, arrival_time, number, owner_name, pet_name, service, state)
        VALUES (
          ${entry.date},
          ${entry.arrival_time}, 
          ${entry.number}, 
          ${entry.owner_name}, 
          ${entry.pet_name}, 
          ${entry.service},
          ${entry.state}
        ) ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedWaitingListEntries;
}

sql.begin(async (sql) => [
  await createWaitingListTable(sql),
  await seedWaitingList(sql),
]);
sql.end();
