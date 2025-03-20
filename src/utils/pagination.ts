const DEFAULT_SORT = { field: 'id', order: 'asc' }

export const paginateArray = <T>({
  array,
  page,
  limit,
}: {
  array: T[]
  page: number
  limit: number
}): T[] => {
  const startIndex = (page - 1) * limit
  return array.slice(startIndex, startIndex + limit)
}

export const createSortedUrl = (baseUrl: string): string => {
  return `${baseUrl}?_sort=${DEFAULT_SORT.field}&_order=${DEFAULT_SORT.order}`
}
