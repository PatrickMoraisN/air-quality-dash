export interface QualityHistoryProps {
  [key: string]: 'bom' | 'moderado' | 'ruim' | 'péssimo'
}

export interface AirQualityData {
  id: number
  name: string
  actual_quality: string
  history: QualityHistoryProps
}

export interface PaginatedResponse {
  data: AirQualityData[]
  total: number
}

export interface GetTotalNeighborhoodsNumberProps {
  total: number
}

export interface PaginatedDataProps {
  response: { data: AirQualityData[] }
  total: number
  limit: number
  page: number
}
