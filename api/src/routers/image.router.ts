import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { ImageService } from '../services/image.service'

export const imageRouter = new Hono().get(
  '/:image',
  zValidator(
    'param',
    z.object({
      image: z.string(),
    }),
  ),
  async (c) => {
    const { image } = c.req.valid('param')
    const file = await ImageService.getFile(image)

    if (file) {
      return c.body(file)
    }

    return c.json(
      {
        error: `${image} was not found!`,
      },
      404,
    )
  },
)
