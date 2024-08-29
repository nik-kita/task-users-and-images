import * as sqlite from 'better-sqlite3'

export const db = new sqlite('dev.sqlite3', { fileMustExist: true })
db.pragma('journal_mode = WAL')
