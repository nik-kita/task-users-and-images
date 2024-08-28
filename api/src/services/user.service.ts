import { db } from '../../db'

async function list(options: {
  limit: number
  offset: number
  order_by: 'image_count' | 'user.id'
  order_direction: 'ASC' | 'DESC'
}) {
  console.log(options)
  const query = db.prepare(`--sql
    SELECT u.*, COUNT(ui.id) image_count
    FROM users u
    LEFT JOIN user_images ui
    ON u.id = ui.user_id
    GROUP BY u.id
    ORDER BY image_count ${options.order_direction === 'ASC' ? 'ASC' : 'DESC'}
    LIMIT @limit
    OFFSET @offset
  `)
  const result = query.all(options)

  return Promise.resolve(result)
}

export const UserService = {
  list
}
