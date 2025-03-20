import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import airQualityAPI from '@services/airQuality'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ListComponent } from '..'

jest.mock('@services/airQuality', () => ({
  searchNeighborhoodByName: jest.fn(),
  getNeighborhoodPaginated: jest.fn(),
  getNeighborhoodsFilteredPaginated: jest.fn(),
}))

jest.mock('../sub-components/NeighborhoodTable', () => ({
  NeighborhoodTable: jest.fn(() => <div data-testid="neighborhood-table">Neighborhood Table</div>),
}))

jest.mock('../sub-components/Pagination', () => ({
  PaginationComponent: jest.fn(() => <div data-testid="pagination">Pagination</div>),
}))

jest.mock('../sub-components/QualityFilter', () => ({
  QualityFilter: jest.fn(() => <div data-testid="quality-filter">Quality Filter</div>),
}))

const mockNeighborhoods = [
  { name: 'Copacabana', actual_quality: 'bom', history: {} },
  { name: 'Ipanema', actual_quality: 'ruim', history: {} },
  { name: 'Botafogo', actual_quality: 'moderado', history: {} },
  { name: 'Leblon', actual_quality: 'péssimo', history: {} },
  { name: 'Centro', actual_quality: 'bom', history: {} },
  { name: 'Barra da Tijuca', actual_quality: 'ruim', history: {} },
  { name: 'Santa Teresa', actual_quality: 'moderado', history: {} },
  { name: 'Flamengo', actual_quality: 'bom', history: {} },
  { name: 'Lapa', actual_quality: 'péssimo', history: {} },
  { name: 'Recreio dos Bandeirantes', actual_quality: 'moderado', history: {} },
  { name: 'Tijuca', actual_quality: 'ruim', history: {} },
  { name: 'Madureira', actual_quality: 'bom', history: {} },
  { name: 'São Cristóvão', actual_quality: 'péssimo', history: {} },
  { name: 'Meier', actual_quality: 'moderado', history: {} },
]

const customRender = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

describe('ListComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('displays the search form correctly', async () => {
    ;(airQualityAPI.getNeighborhoodPaginated as jest.Mock).mockResolvedValue({
      data: mockNeighborhoods,
      total: 2,
    })
    customRender(<ListComponent />)

    await waitFor(() => expect(screen.getByTestId('neighborhood-table')).toBeInTheDocument())
    expect(screen.getByPlaceholderText('Buscar bairro. Ex: Copacabana')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument()
  })

  it('displays the neighborhood table on initial load', async () => {
    ;(airQualityAPI.getNeighborhoodPaginated as jest.Mock).mockResolvedValue({
      data: mockNeighborhoods,
      total: 2,
    })

    customRender(<ListComponent />)

    await waitFor(() => expect(screen.getByTestId('neighborhood-table')).toBeInTheDocument())
  })

  it('searches for a neighborhood and displays the results', async () => {
    ;(airQualityAPI.getNeighborhoodPaginated as jest.Mock).mockResolvedValue({
      data: mockNeighborhoods,
      total: 2,
    })

    customRender(<ListComponent />)

    await waitFor(() => expect(screen.getByTestId('neighborhood-table')).toBeInTheDocument())

    const input = screen.getByPlaceholderText('Buscar bairro. Ex: Copacabana')
    fireEvent.change(input, { target: { value: 'Copacabana' } })
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    await waitFor(() =>
      expect(airQualityAPI.searchNeighborhoodByName).toHaveBeenCalledWith('Copacabana')
    )
  })

  it('filters neighborhoods by air quality', async () => {
    ;(airQualityAPI.getNeighborhoodsFilteredPaginated as jest.Mock).mockResolvedValue({
      data: [mockNeighborhoods[1]],
      total: 1,
    })

    customRender(<ListComponent />)

    await waitFor(() => expect(screen.getByTestId('quality-filter')).toBeInTheDocument())

    fireEvent.click(screen.getByTestId('quality-filter'))

    await waitFor(() => expect(screen.getByTestId('neighborhood-table')).toBeInTheDocument())
  })

  it('displays pagination when multiple pages exist', async () => {
    ;(airQualityAPI.getNeighborhoodPaginated as jest.Mock).mockResolvedValue({
      data: mockNeighborhoods,
      total: 20,
    })

    customRender(<ListComponent />)

    await waitFor(() => expect(screen.getByTestId('neighborhood-table')).toBeInTheDocument())

    await waitFor(() => expect(screen.getByTestId('pagination')).toBeInTheDocument())
  })

  it('changes pages correctly when clicking pagination', async () => {
    ;(airQualityAPI.getNeighborhoodPaginated as jest.Mock).mockResolvedValue({
      data: mockNeighborhoods,
      total: 20,
    })

    customRender(<ListComponent />)

    await waitFor(() => expect(screen.getByTestId('pagination')).toBeInTheDocument())

    fireEvent.click(screen.getByTestId('pagination'))

    await waitFor(() =>
      expect(airQualityAPI.getNeighborhoodPaginated).toHaveBeenCalledWith(expect.any(Number))
    )
  })
})
