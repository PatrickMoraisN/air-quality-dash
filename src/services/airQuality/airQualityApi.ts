/* eslint-disable import/no-anonymous-default-export */
import ErrorMessages from '@constants/errorMessages'
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
  try {
    const adjustedLimit = limit * page

    const response = await api.get(
      createSortedUrl(`${airQualityApiRoutes.index}?_limit=${adjustedLimit}`)
    )
    const { total } = await getTotalNeighborhoodsNumber()

    const { data, total: totalPages } = transformPaginatedResponse({ response, total, limit, page })

    return { data, total: totalPages }
  } catch (error) {
    console.error(ErrorMessages.FailedToFetchPaginated, error)
    throw new Error(ErrorMessages.FailedToFetchPaginated)
  }
}

const getNeighborhoodsFilteredPaginated = async (
  qualities: string[],
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT
): Promise<PaginatedResponse> => {
  try {
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
  } catch (error) {
    console.error(ErrorMessages.FailedToFetchFiltered, error)
    throw new Error(ErrorMessages.FailedToFetchFiltered)
  }
}

const searchNeighborhoodByName = async (name: string): Promise<AirQualityData[]> => {
  try {
    const normalizedName = normalizeSearchTerm(name).toLowerCase()

    const response = await api.get<AirQualityData[]>(createSortedUrl(airQualityApiRoutes.index))

    return response.data.filter(n => n.name.toLowerCase().includes(normalizedName))
  } catch (error) {
    console.error(ErrorMessages.FailedToSearchByName, error)
    throw new Error(ErrorMessages.FailedToSearchByName)
  }
}

const getTotalNeighborhoodsNumber = async (): Promise<GetTotalNeighborhoodsNumberProps> => {
  try {
    const response = await api.get(airQualityApiRoutes.totalPages)
    return response.data
  } catch (error) {
    console.error(ErrorMessages.FailedToFetchTotal, error)
    throw new Error(ErrorMessages.FailedToFetchTotal)
  }
}

export default {
  getNeighborhoodPaginated,
  searchNeighborhoodByName,
  getNeighborhoodsFilteredPaginated,
}
