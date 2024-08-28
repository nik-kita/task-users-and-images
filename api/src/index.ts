import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { db } from '../db'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
}).on('close', () => {
  db.close()
})
