export const obj_to_qs = (obj: Record<string, any>) => {
  return (
    '?' +
    new URLSearchParams(
      Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, String(v)])),
    ).toString()
  )
}
