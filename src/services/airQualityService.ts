/* eslint-disable import/no-anonymous-default-export */
import { airQualityServiceRoutes } from '../routes/airQualityService.routes'
import { toTitleCase } from '../utils/stringsUtils'
import { api } from './api'

interface AirQualityData {
  id: number
  name: string
  actual_quality: string
  history: Record<string, string>
}

interface PaginatedResponse {
  data: AirQualityData[]
  total: number
}

interface getTotalNeighborhoodsNumberProps {
  total: number
}

const getBairrosPaginated = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse> => {
  const adjustedLimit = limit * page

  const response = await api.get(
    `${airQualityServiceRoutes.index}?_limit=${adjustedLimit}&_sort=id&_order=asc`
  )
  const { total } = await getTotalNeighborhoodsNumber()

  const totalPages = Math.ceil(total / limit) * 2

  const startIndex = (page - 1) * limit
  const paginatedData = response.data.slice(startIndex, startIndex + limit)

  return { data: paginatedData, total: totalPages }
}

const getNeighborhoodsFilteredPaginated = async (
  qualities: string[],
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse> => {
  const totalResponse = await api.get(`${airQualityServiceRoutes.index}?_sort=id&_order=asc`)
  const respondeFiltered: AirQualityData[] = totalResponse.data.filter(
    (neighborhood: AirQualityData) => qualities.includes(neighborhood.actual_quality)
  )
  const total = Math.ceil(respondeFiltered.length / limit)
  const startIndex = (page - 1) * limit
  const paginatedData = respondeFiltered.slice(startIndex, startIndex + limit)

  return { data: paginatedData, total }
}

const searchBairroByName = async (name: string): Promise<AirQualityData[]> => {
  const normalizedName = toTitleCase(name.trim())
  const response = await api.get(`${airQualityServiceRoutes.index}?name=${normalizedName}`)
  return response.data
}

const filterBairrosByQuality = async (qualities: string[]): Promise<AirQualityData[]> => {
  const query = qualities.map(q => `actual_quality=${q}`).join('&')
  const response = await api.get(`${airQualityServiceRoutes.index}?${query}`)
  return response.data
}

const getTotalNeighborhoodsNumber = async (): Promise<getTotalNeighborhoodsNumberProps> => {
  const response = await api.get(airQualityServiceRoutes.totalPages)
  return response.data
}

export default {
  getBairrosPaginated,
  searchBairroByName,
  filterBairrosByQuality,
  getNeighborhoodsFilteredPaginated,
}
