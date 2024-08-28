import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { UserSchema } from '../models/user.model'
import { UserService } from '../services/user.service'

const UsersListOptions = z.object({
  limit: z.number({ coerce: true }).default(10),
  offset: z.number({ coerce: true }).default(0),
  order_direction: z.enum(['ASC', 'DESC']).default('DESC'),
  order_by: z.enum(['user.name', 'user.updated_at', 'image_count']).default('image_count')
})

export const userRouter = new Hono()
  .post('/', zValidator('form', UserSchema), async (c) => {
    const data = c.req.valid('form')
    const user_id = await UserService.create(data)

    return c.json({ user_id })
  })
  .get('/', zValidator('query', UsersListOptions), async (c) => {
    const options = c.req.valid('query')
    const users = await UserService.list(options)

    return c.json({
      users
    })
  })
