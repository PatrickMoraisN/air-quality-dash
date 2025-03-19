import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { fireEvent, render, screen } from '@testing-library/react'
import { NeighborhoodPopup } from '..'

jest.mock('../../AirQualityChart', () => ({
  AirQualityChart: jest.fn(() => <div data-testid="air-quality-chart" />),
}))

jest.mock('@components/AirQualityText', () => ({
  AirQualityText: jest.fn(({ airQuality }) => <span>{airQuality}</span>),
}))

const customRender = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

interface QualityHistoryProps {
  [key: string]: 'bom' | 'moderado' | 'ruim' | 'péssimo'
}

interface SelectedNeighborhood {
  name: string
  actual_quality: string
  history: QualityHistoryProps
}

describe('NeighborhoodPopup Component', () => {
  const mockCloseModal = jest.fn()
  const mockSelectedNeighborhood = {
    name: 'Copacabana',
    actual_quality: 'bom',
    history: {
      '2025-03-17T21:34:20-03:00': 'moderado',
      '2025-03-16T21:34:20-03:00': 'ruim',
    },
  }

  const renderComponent = (isPopupOpen: boolean) =>
    customRender(
      <NeighborhoodPopup
        selectedNeighborhood={mockSelectedNeighborhood as SelectedNeighborhood}
        isPopupOpen={isPopupOpen}
        closeModal={mockCloseModal}
      />
    )

  it('renders modal when isPopupOpen is true', () => {
    renderComponent(true)

    expect(screen.getByText('Copacabana')).toBeInTheDocument()
    expect(screen.getByText('A qualidade do ar atual é:')).toBeInTheDocument()
    expect(screen.getByText('bom')).toBeInTheDocument()
    expect(screen.getByTestId('air-quality-chart')).toBeInTheDocument()
  })

  it('not render modal when isPopupOpen is false', () => {
    renderComponent(false)

    expect(screen.queryByText('Copacabana')).not.toBeInTheDocument()
  })

  it('calls closeModal when close button is clicked', () => {
    renderComponent(true)

    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    expect(mockCloseModal).toHaveBeenCalledTimes(1)
  })
})
