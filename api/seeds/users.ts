import { faker } from '@faker-js/faker'
import { writeFile } from 'fs/promises'
import { Knex } from 'knex'
import { join } from 'path'

const TOTAL_USERS = 10_000
const CHUNK_SIZE = 500
const ITERATIONS = Math.ceil(TOTAL_USERS / CHUNK_SIZE)

export async function seed(knex: Knex): Promise<void> {
  try {
    await knex('users').del()
    for (let i = 0; i < ITERATIONS; ++i) {
      const users = genUsersChunk(CHUNK_SIZE)
      await knex.batchInsert('users', users)
    }
  } catch (err: any) {
    await logError(err)
  }

  function genUsersChunk(chunkSize: number) {
    const users = []

    for (let i = 0; i < chunkSize; ++i) {
      users.push({
        name: faker.person.fullName(),
        city: faker.location.city(),
        created_at: faker.date.between({ from: '2020-01-01', to: '2024-01-01' }).getTime()
      })
    }

    console.log(users)
    return users
  }

  async function logError(err: any) {
    await writeFile(
      join(__dirname, __filename.split('/').at(-1) + '.error.txt'),
      `
        err.message:
        ${err.message}
        err.stack:
        ${err.stack}
        String(err):
        ${String(err)}
        err:
        ${err}
    `,
      { encoding: 'utf-8' }
    )
    throw err
  }
}
