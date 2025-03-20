/* eslint-disable import/no-anonymous-default-export */
import { airQualityServiceRoutes } from '../routes/airQualityService.routes'
import { toTitleCase } from '../utils/stringsUtils'
import { api } from './api'

interface QualityHistoryProps {
  [key: string]: 'bom' | 'moderado' | 'ruim' | 'péssimo'
}

interface AirQualityData {
  id: number
  name: string
  actual_quality: string
  history: QualityHistoryProps
}

interface PaginatedResponse {
  data: AirQualityData[]
  total: number
}

interface getTotalNeighborhoodsNumberProps {
  total: number
}

interface PaginatedDataProps {
  response: { data: AirQualityData[] }
  total: number
  limit: number
  page: number
}

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10
const DEFAULT_SORT = { field: 'id', order: 'asc' }

const createSortedUrl = (baseUrl: string): string => {
  return `${baseUrl}?_sort=${DEFAULT_SORT.field}&_order=${DEFAULT_SORT.order}`
}

const normalizeSearchTerm = (term: string): string => {
  return toTitleCase(term.trim())
}

const paginatedData = ({ response, total, limit, page }: PaginatedDataProps) => {
  const totalPages = Math.ceil(total / limit)

  const startIndex = (page - 1) * limit
  const paginatedData = response.data.slice(startIndex, startIndex + limit)

  return { data: paginatedData, total: totalPages }
}

const getNeighborhoodPaginated = async (
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT
): Promise<PaginatedResponse> => {
  const adjustedLimit = limit * page

  const response = await api.get(
    createSortedUrl(`${airQualityServiceRoutes.index}?_limit=${adjustedLimit}`)
  )
  const { total } = await getTotalNeighborhoodsNumber()

  const { data, total: totalPages } = paginatedData({ response, total, limit, page })

  return { data, total: totalPages }
}

const getNeighborhoodsFilteredPaginated = async (
  qualities: string[],
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT
): Promise<PaginatedResponse> => {
  const totalResponse = await api.get(createSortedUrl(airQualityServiceRoutes.index))
  const responseFiltered: AirQualityData[] = totalResponse.data.filter(
    (neighborhood: AirQualityData) => qualities.includes(neighborhood.actual_quality)
  )

  const { data, total } = paginatedData({
    response: { data: responseFiltered },
    total: responseFiltered.length,
    limit,
    page,
  })

  return { data, total }
}

const getGeneralNeighborhoodsByName = async (name: string): Promise<{ data: AirQualityData[] }> => {
  const normalizedName = normalizeSearchTerm(name)
  const response = await api.get(createSortedUrl(airQualityServiceRoutes.index))

  const filteredData = response.data.filter((neighborhood: AirQualityData) =>
    neighborhood.name.toLowerCase().includes(normalizedName.toLowerCase())
  )

  return { data: filteredData }
}

const searchNeighborhoodByName = async (name: string): Promise<AirQualityData[]> => {
  const normalizedName = normalizeSearchTerm(name)

  const exactResponse = await api.get(`${airQualityServiceRoutes.index}?name=${normalizedName}`)

  if (exactResponse.data.length === 0) {
    const { data } = await getGeneralNeighborhoodsByName(normalizedName)
    return data
  }

  return exactResponse.data
}

const getTotalNeighborhoodsNumber = async (): Promise<getTotalNeighborhoodsNumberProps> => {
  const response = await api.get(airQualityServiceRoutes.totalPages)
  return response.data
}

export default {
  getNeighborhoodPaginated,
  searchNeighborhoodByName,
  getNeighborhoodsFilteredPaginated,
}
