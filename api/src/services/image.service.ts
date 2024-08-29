import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { db } from '../db'

const CWD = process.cwd()
const getFile = async (image: string) => {
  try {
    const result = await readFile(join(CWD, 'local-s3', image))

    return result
  } catch (err) {
    return null
  }
}

const saveFile = async (file: File, user_id: number) => {
  try {
    const path = process.env.SELF_URL + `/api/images/image-${Date.now()}-${file.name}}`
    await writeFile(join(CWD, 'local-s3', path), file.stream())
    const { lastInsertRowid } = await db
      .prepare(
        `--sql
      INSERT INTO user_images (user_id, image)
      VALUES (@user_id, @path)
    `,
      )
      .run({ user_id, path })
    return {
      path,
      image_id: lastInsertRowid,
    }
  } catch (err) {
    console.error(err)
    return null
  }
}
async function getManyByUserId(user_id: number) {
  const query = db.prepare(`--sql
    SELECT * FROM user_images WHERE user_id = @user_id
  `)
  const result = query.all({ user_id }) as { image: string }[]
  console.log(result)

  return Promise.resolve(result)
}


export const ImageService = {
  getFile,
  saveFile,
  getManyByUserId,
}
