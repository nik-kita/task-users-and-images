import { faker } from '@faker-js/faker'
import { readFile } from 'fs/promises'
import { Knex } from 'knex'
import { FILE_NAME_USERS_IDS } from './users'
import { genChunk } from './utils/gen-chunk.util'
import { randomIndex } from './utils/random-index.util'
import { logError } from './utils/log-error.util'

const TOTAL_USER_IMAGES = 100_000
const CHUNK_SIZE = 500
const ITERATIONS = Math.ceil(TOTAL_USER_IMAGES / CHUNK_SIZE)

export async function seed(knex: Knex): Promise<void> {
  await knex('user_images').del()
  const idsData = await readFile(FILE_NAME_USERS_IDS, {
    encoding: 'utf-8'
  })
  const userIds = idsData.split(' ').map(Number)

  try {
    for (let i = 0; i < ITERATIONS; ++i) {
      const userImages = genChunk(CHUNK_SIZE, () => ({
        image: faker.image.url(),
        user_id: randomIndex(userIds)
      }))
      await knex.batchInsert('user_images', userImages)
    }
  } catch (err) {
    await logError(err)
    throw err
  }
}
