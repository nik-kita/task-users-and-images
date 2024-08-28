import { faker } from '@faker-js/faker'
import { appendFile, writeFile } from 'fs/promises'
import { Knex } from 'knex'
import { join } from 'path'
import { genChunk } from './utils/gen-chunk.util'
import { logError } from './utils/log-error.util'

const TOTAL_USERS = 10_000
const CHUNK_SIZE = 500
const ITERATIONS = Math.ceil(TOTAL_USERS / CHUNK_SIZE)
export const FILE_NAME_USERS_IDS = join(__dirname, 'users.ids.txt')

export async function seed(knex: Knex): Promise<void> {
  console.info('Seeding users...')
  try {
    await knex('users').del()
    await writeFile(FILE_NAME_USERS_IDS, '', { encoding: 'utf-8' })
    for (let i = 0; i < ITERATIONS; ++i) {
      const users = genChunk(CHUNK_SIZE, () => ({
        name: faker.person.fullName(),
        city: faker.location.city(),
        created_at: faker.date.between({ from: '2020-01-01', to: '2024-01-01' }).getTime()
      }))
      const ids = await knex.batchInsert('users', users).returning('id')
      await appendFile(FILE_NAME_USERS_IDS, ids.map(({ id }) => id).join(' '), {
        encoding: 'utf-8'
      })
    }
  } catch (err: any) {
    await logError(err)
    throw err
  }
}
