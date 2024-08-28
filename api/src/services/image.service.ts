import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { db } from '../../db'

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
    const path = `image-${Date.now()}-${file.name}}`
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

export const ImageService = {
  getFile,
  saveFile,
}
