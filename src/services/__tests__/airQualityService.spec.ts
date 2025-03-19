import { airQualityServiceRoutes } from '../../routes/airQualityService.routes'
import airQualityService from '../airQualityService'
import { api } from '../api'

jest.mock('../api')

describe('getNeighborhoodsFilteredPaginated', () => {
  const mockData = [
    { id: 1, name: 'Neighborhood A', actual_quality: 'bom', history: [] },
    { id: 2, name: 'Neighborhood B', actual_quality: 'moderado', history: [] },
    { id: 3, name: 'Neighborhood C', actual_quality: 'ruim', history: [] },
    { id: 4, name: 'Neighborhood D', actual_quality: 'péssimo', history: [] },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return paginated and filtered neighborhoods', async () => {
    ;(api.get as jest.Mock).mockResolvedValueOnce({ data: mockData })

    const qualities = ['bom']
    const page = 1
    const limit = 2
    const result = await airQualityService.getNeighborhoodsFilteredPaginated(qualities, page, limit)

    expect(api.get).toHaveBeenCalledWith(`${airQualityServiceRoutes.index}?_sort=id&_order=asc`)
    expect(result.data).toEqual([
      { id: 1, name: 'Neighborhood A', actual_quality: 'bom', history: [] },
    ])
    expect(result.total).toBe(1)
  })

  it('should handle pagination correctly', async () => {
    const newMockData = [
      { id: 1, name: 'Neighborhood A', actual_quality: 'bom', history: [] },
      { id: 2, name: 'Neighborhood B', actual_quality: 'moderado', history: [] },
      { id: 3, name: 'Neighborhood C', actual_quality: 'bom', history: [] },
      { id: 4, name: 'Neighborhood D', actual_quality: 'ruim', history: [] },
    ]
    ;(api.get as jest.Mock).mockResolvedValueOnce({ data: newMockData })

    const qualities = ['bom', 'moderado']
    const page = 2
    const limit = 2

    const result = await airQualityService.getNeighborhoodsFilteredPaginated(qualities, page, limit)

    const expectedData = [{ id: 3, name: 'Neighborhood C', actual_quality: 'bom', history: [] }]
    const expectedTotal = 2

    expect(api.get).toHaveBeenCalledWith(`${airQualityServiceRoutes.index}?_sort=id&_order=asc`)
    expect(result.data).toEqual(expectedData)
    expect(result.total).toBe(expectedTotal)
  })

  it('should return an empty array when no neighborhoods match the filter', async () => {
    ;(api.get as jest.Mock).mockResolvedValueOnce({ data: mockData })

    const qualities = ['diferent-quality']
    const page = 1
    const limit = 2
    const result = await airQualityService.getNeighborhoodsFilteredPaginated(qualities, page, limit)

    expect(api.get).toHaveBeenCalledWith(`${airQualityServiceRoutes.index}?_sort=id&_order=asc`)
    expect(result.data).toEqual([])
    expect(result.total).toBe(0)
  })
})
