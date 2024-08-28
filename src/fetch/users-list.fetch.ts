import { API_URL } from '@/const'

type User = {
  id: number
  created_at: number
  updated_at: number
  name: string
  city: string
}

export const fetch_usersList = async () => {
  const res = await fetch(`${API_URL}/api/users`)
  if (!res.ok) {
    throw res.statusText
  }

  const result = await res.json()

  return result as Promise<{
    users: User[]
  }>
}
