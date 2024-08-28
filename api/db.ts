import Database from 'better-sqlite3'

export const db = new Database('dev.sqlite3', { fileMustExist: true })
db.pragma('journal_mode = WAL')
