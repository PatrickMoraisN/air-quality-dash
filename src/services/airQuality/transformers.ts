import { paginateArray } from '../../utils/pagination'
import { PaginatedDataProps } from './types'

export const transformPaginatedResponse = ({
  response,
  total,
  limit,
  page,
}: PaginatedDataProps) => {
  const totalPages = Math.ceil(total / limit)

  const paginatedDataArray = paginateArray({
    array: response.data,
    page,
    limit,
  })

  return { data: paginatedDataArray, total: totalPages }
}
