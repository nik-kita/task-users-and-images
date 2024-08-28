import { API_URL } from '@/const'
import { obj_to_qs } from '@/utils/obj-to-qs.util'

type Item = {
  id: number
  created_at: number
  updated_at: number
  name: string
  city: string
  image_count: number
}

export const fetch_usersList = async (options: {
  limit: number
  offset: number
  order_direction: 'ASC' | 'DESC'
  order_by: 'user.name' | 'image_count' | 'user.updated_at'
}) => {
  const res = await fetch(`${API_URL}/api/users${obj_to_qs(options)}`)

  if (!res.ok) {
    throw res.statusText
  }

  const result = await res.json()

  return result as Promise<{
    users: Item[]
  }>
}
