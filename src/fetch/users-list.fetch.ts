import { API_URL } from '@/const'
import { obj_to_qs } from '@/utils/obj-to-qs.util'

type User = {
  id: number
  created_at: number
  updated_at: number
  name: string
  city: string
}

export const fetch_usersList = async (options: {
  limit: number
  offset: number
  order_direction: 'ASC' | 'DESC'
  order_by: 'user.id' | 'image_count'
}) => {
  const res = await fetch(`${API_URL}/api/users${obj_to_qs(options)}`)

  if (!res.ok) {
    throw res.statusText
  }

  const result = await res.json()

  return result as Promise<{
    users: User[]
  }>
}
