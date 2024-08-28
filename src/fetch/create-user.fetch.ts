import { API_URL } from '@/const'

type Data = {
  name: string
  city: string
}

export const fetch_createUser = async (payload: Data) => {
  const res = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    throw res.statusText
  }

  const result = await res.json()

  return result as Promise<{
    user_id: number
  }>
}
