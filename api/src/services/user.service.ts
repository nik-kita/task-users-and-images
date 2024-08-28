import { db } from '../../db'
import { User } from '../models/user.model'

async function list(options: {
  limit: number
  offset: number
  order_by: 'image_count' | 'user.name' | 'user.updated_at'
  order_direction: 'ASC' | 'DESC'
}) {
  const query = db.prepare(`--sql
    SELECT user.*, COUNT(ui.id) image_count
    FROM users user
    LEFT JOIN user_images ui
    ON user.id = ui.user_id
    GROUP BY user.id
    ORDER BY ${options.order_by} ${options.order_direction}
    LIMIT @limit
    OFFSET @offset
  `)
  const result = query.all(options)

  return Promise.resolve(result)
}

async function create(user: User) {
  const query = db.prepare(`--sql
    INSERT INTO users (name, city)
    VALUES (@name, @city)
  `)
  const { lastInsertRowid } = query.run(user)

  return Promise.resolve(lastInsertRowid)
}

async function getManyByUserId(user_id: number) {
  const query = db.prepare(`--sql
    SELECT * FROM user_images WHERE user_id = @user_id
  `)
  const result = query.all({ user_id }) as { image: string }[]
  console.log(result)

  return Promise.resolve(result)
}

export const UserService = {
  list,
  create,
  getManyByUserId
}
