import { faker } from '@faker-js/faker'
import { readFile } from 'fs/promises'
import { Knex } from 'knex'
import { writeFile } from 'node:fs/promises'
import { join } from 'path'
import { FILE_NAME_USERS_IDS } from './a.users'
import { logError } from './utils/log-error.util'
import { randomIndex } from './utils/random-index.util'

const TOTAL_USER_IMAGES = 100_000
const CWD = process.cwd()
export async function seed(knex: Knex): Promise<void> {
  await knex('user_images').del()
  const idsData = await readFile(FILE_NAME_USERS_IDS, {
    encoding: 'utf-8',
  })
  const userIds = idsData.split(' ').map(Number)

  try {
    for (let i = 0; i < TOTAL_USER_IMAGES; ++i) {
      let file: File
      try {
        const img = faker.image.url()
        console.log(img)
        file = new File(
          [await (await fetch(img)).blob()],
          img.split('/').pop() || `image-${Date.now()}.jpg`,
        )
      } catch (err) {
        console.log(err)
        continue
      }
      const user_id = userIds[randomIndex(userIds)]
      const path = `image-${Date.now()}-${file.name}`
      await writeFile(join(CWD, 'local-s3', path), file.stream())
      await knex.raw(
        `--sql
          INSERT INTO user_images ('user_id', 'image')
          VALUES(:user_id, :path)
        `,
        { user_id, path },
      )
    }
  } catch (err) {
    await logError(err)
    throw err
  }
}
