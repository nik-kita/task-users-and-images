import { db } from '../../db'

async function list(options: {
  limit: number
  offset: number
  order_by: 'image_count' | 'user.name'
  order_direction: 'ASC' | 'DESC'
}) {
  console.log(options)
  const query = db.prepare(`--sql
    SELECT user.*, COUNT(ui.id) image_count
    FROM users user
    LEFT JOIN user_images ui
    ON user.id = ui.user_id
    GROUP BY user.id
    ORDER BY ${
      options.order_by === 'user.name' ? 'user.name' : 'image_count'
    } ${options.order_direction === 'ASC' ? 'ASC' : 'DESC'}
    LIMIT @limit
    OFFSET @offset
  `)
  const result = query.all(options)

  return Promise.resolve(result)
}

export const UserService = {
  list
}
