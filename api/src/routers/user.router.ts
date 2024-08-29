import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { UserSchema } from '../models/user.model'
import { ImageService } from '../services/image.service'
import { UserService } from '../services/user.service'

const UsersListOptions = z.object({
  limit: z.number({ coerce: true }).default(10),
  offset: z.number({ coerce: true }).default(0),
  order_direction: z.enum(['ASC', 'DESC']).default('DESC'),
  order_by: z.enum(['user.name', 'user.updated_at', 'image_count']).default('image_count'),
})

export const userRouter = new Hono()
  .post(
    '/',
    zValidator(
      'form',
      UserSchema.merge(
        z.object({
          image: z
            .custom<File>((v) => {
              return v instanceof File
            })
            .optional(),
        }),
      ),
    ),
    async (c) => {
      const { city, name, image } = c.req.valid('form')
      const user_id = await UserService.create({ city, name })

      let image_id: number | null = null
      if (image) {
        console.log('saving image')
        const result = await ImageService.saveFile(image, user_id as number)
        if (result) {
          image_id = result.image_id as number
        }
      }

      return c.json({ user_id, image_path: image_id })
    },
  )
  .get(
    '/images/:user_id',
    zValidator(
      'param',
      z.object({
        user_id: z.string({ coerce: true }),
      }),
    ),
    async (c) => {
      const { user_id } = c.req.valid('param')
      const data = await ImageService.getManyByUserId(parseInt(user_id))

      return c.json({ images: data.map(({ image }) => image) })
    },
  )
  .get('/', zValidator('query', UsersListOptions), async (c) => {
    const options = c.req.valid('query')
    const users = await UserService.list(options as any)

    return c.json({
      users,
    })
  })
