import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { fireEvent, render, screen } from '@testing-library/react'
import { NeighborhoodTable } from '..'

jest.mock('@components/AirQualityText', () => ({
  AirQualityText: jest.fn(({ airQuality }) => <span>{airQuality}</span>),
}))

jest.mock('@components/NeighborhoodPopup', () => ({
  NeighborhoodPopup: jest.fn(({ isPopupOpen }) =>
    isPopupOpen ? <div data-testid="popup">Popup Aberto</div> : null
  ),
}))

const mockNeighborhoods = [
  { name: 'Copacabana', actual_quality: 'bom', history: {} },
  { name: 'Ipanema', actual_quality: 'ruim', history: {} },
]

const customRender = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

describe('NeighborhoodTable', () => {
  it('shows error message when has no neighborhoods', () => {
    customRender(<NeighborhoodTable neighborhoods={[]} />)
    expect(screen.getByText('Bairro não encontrado')).toBeInTheDocument()
  })

  it('renders correctly list-table', () => {
    customRender(<NeighborhoodTable neighborhoods={mockNeighborhoods} />)

    expect(screen.getByText('Copacabana')).toBeInTheDocument()
    expect(screen.getByText('Ipanema')).toBeInTheDocument()
    expect(screen.getByText('bom')).toBeInTheDocument()
    expect(screen.getByText('ruim')).toBeInTheDocument()
  })

  it('opens popup when click on neighborhood on list-table', () => {
    customRender(<NeighborhoodTable neighborhoods={mockNeighborhoods} />)

    const row = screen.getByText('Copacabana').closest('tr')
    fireEvent.click(row!)

    expect(screen.getByTestId('popup')).toBeInTheDocument()
  })
})
