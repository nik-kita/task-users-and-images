import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function logError(err: any, fileName = new Date().toLocaleDateString()) {
  await writeFile(
    join(__dirname, fileName.split('/').at(-1) + '.error.txt'),
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
}
