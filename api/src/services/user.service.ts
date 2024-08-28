import { db } from '../../db'

async function list(options: {
  limit: number
  offset: number
  order_by: 'image_count' | 'user.id'
  order_direction: 'ASC' | 'DESC'
}) {
  const query = db.prepare(`--sql
    SELECT u.*, COUNT(ui.id) image_count
    FROM users u
    LEFT JOIN user_images ui
    ON u.id = ui.user_id
    GROUP BY @order_by
    LIMIT @limit
    OFFSET @offset
  `)
  const result = query.all(options)

  return Promise.resolve(result)
}

export const UserService = {
  list
}
