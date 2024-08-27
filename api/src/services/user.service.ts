async function list(
  options: {
    limit?: number
    offset?: number
    order?: {
      type?: 'ASC' | 'DESC'
      logic: 'by-image-count'
    }
  } = {}
) {
  const {
    limit = 10,
    offset = 0,
    order = {
      type: 'DESC',
      logic: 'by-image-count'
    }
  } = options
}

export const UserService = {
  list
}
