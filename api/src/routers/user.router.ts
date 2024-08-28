import { Hono } from 'hono'
import { UserService } from '../services/user.service'

export const userRouter = new Hono().get('/', async (c) => {
  const users = await UserService.list({
    limit: 10,
    offset: 0,
    order_by: 'image_count',
    order_direction: 'DESC'
  })

  console.log(users)
  return c.json({
    users
  })
})
