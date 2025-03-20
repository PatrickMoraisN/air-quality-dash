/* eslint-disable import/no-anonymous-default-export */
import { airQualityApiRoutes } from '@routes/airQualityApi.routes'
import { createSortedUrl } from '@utils/pagination'
import { normalizeSearchTerm } from '@utils/strings'
import { api } from '../common/api'
import { transformPaginatedResponse } from './transformers'
import { AirQualityData, GetTotalNeighborhoodsNumberProps, PaginatedResponse } from './types'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const getNeighborhoodPaginated = async (
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT
): Promise<PaginatedResponse> => {
  const adjustedLimit = limit * page

  const response = await api.get(
    createSortedUrl(`${airQualityApiRoutes.index}?_limit=${adjustedLimit}`)
  )
  const { total } = await getTotalNeighborhoodsNumber()

  const { data, total: totalPages } = transformPaginatedResponse({ response, total, limit, page })

  return { data, total: totalPages }
}

const getNeighborhoodsFilteredPaginated = async (
  qualities: string[],
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT
): Promise<PaginatedResponse> => {
  const totalResponse = await api.get(createSortedUrl(airQualityApiRoutes.index))
  const responseFiltered: AirQualityData[] = totalResponse.data.filter(
    (neighborhood: AirQualityData) => qualities.includes(neighborhood.actual_quality)
  )

  const { data, total } = transformPaginatedResponse({
    response: { data: responseFiltered },
    total: responseFiltered.length,
    limit,
    page,
  })

  return { data, total }
}

const getGeneralNeighborhoodsByName = async (name: string): Promise<{ data: AirQualityData[] }> => {
  const normalizedName = normalizeSearchTerm(name)
  const response = await api.get(createSortedUrl(airQualityApiRoutes.index))

  const filteredData = response.data.filter((neighborhood: AirQualityData) =>
    neighborhood.name.toLowerCase().includes(normalizedName.toLowerCase())
  )

  return { data: filteredData }
}

const searchNeighborhoodByName = async (name: string): Promise<AirQualityData[]> => {
  const normalizedName = normalizeSearchTerm(name)

  const exactResponse = await api.get(`${airQualityApiRoutes.index}?name=${normalizedName}`)

  if (exactResponse.data.length === 0) {
    const { data } = await getGeneralNeighborhoodsByName(normalizedName)
    return data
  }

  return exactResponse.data
}

const getTotalNeighborhoodsNumber = async (): Promise<GetTotalNeighborhoodsNumberProps> => {
  const response = await api.get(airQualityApiRoutes.totalPages)
  return response.data
}

export default {
  getNeighborhoodPaginated,
  searchNeighborhoodByName,
  getNeighborhoodsFilteredPaginated,
}
