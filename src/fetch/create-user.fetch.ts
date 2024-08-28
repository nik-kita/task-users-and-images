import { API_URL } from '@/const'

type UserData = {
  name: string
  city: string
}

export const fetch_createUser = async (payload: UserData, image?: File) => {
  const formData = new FormData()
  formData.append('name', payload.name)
  formData.append('city', payload.city)
  if (image) {
    formData.append('image', image)
  }
  const res = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    body: formData
  })

  if (!res.ok) {
    throw res.statusText
  }

  const result = await res.json()

  return result as Promise<{
    user_id: number
  }>
}
