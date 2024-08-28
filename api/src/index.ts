import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRouter } from './routers/user.router'
import { cors } from 'hono/cors'
import { imageRouter } from './routers/image.router'

const app = new Hono()
const PORT = 3000

app.use(cors({ origin: process.env.ORIGINS?.split(' ') || 'http://localhost:5173' }))
app.route('/api/users', userRouter)
app.route('/api/images', imageRouter)
app.get('/*', (c) => {
  return c.text('All API is defined by the /api path')
})

console.info(`Server is running on port http://localhost:${PORT}`)

serve({
  fetch: app.fetch,
  port: PORT
})
