import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { QualityFilter, QualityLevel } from '..'

jest.mock('phosphor-react', () => ({
  Check: jest.fn(() => <div data-testid="check-icon" />),
}))

const mockThemeLight = { mode: 'light', qualityText: { bacground: '#fff' }, color: '#2D4A43' }

const customRender = (ui: React.ReactElement) => {
  const utils = render(<ThemeProvider theme={mockThemeLight}>{ui}</ThemeProvider>)

  const customRerender = (newUi: React.ReactElement) => {
    return utils.rerender(<ThemeProvider theme={mockThemeLight}>{newUi}</ThemeProvider>)
  }

  return {
    ...utils,
    rerender: customRerender,
  }
}

describe('QualityFilter Component', () => {
  const defaultProps = {
    handleQualityFilter: jest.fn(),
    qualityFilters: [] as QualityLevel[],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    jest.doMock('styled-components', () => {
      const original = jest.requireActual('styled-components')
      return {
        ...original,
        useTheme: jest.fn(() => mockThemeLight),
      }
    })
  })

  it('renders all quality level buttons', () => {
    customRender(<QualityFilter {...defaultProps} />)

    expect(screen.getByText('bom')).toBeInTheDocument()
    expect(screen.getByText('moderado')).toBeInTheDocument()
    expect(screen.getByText('ruim')).toBeInTheDocument()
    expect(screen.getByText('péssimo')).toBeInTheDocument()

    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })

  it('calls handleQualityFilter when buttons are clicked', () => {
    customRender(<QualityFilter {...defaultProps} />)

    fireEvent.click(screen.getByText('bom'))
    expect(defaultProps.handleQualityFilter).toHaveBeenCalledWith('bom')

    fireEvent.click(screen.getByText('moderado'))
    expect(defaultProps.handleQualityFilter).toHaveBeenCalledWith('moderado')

    fireEvent.click(screen.getByText('ruim'))
    expect(defaultProps.handleQualityFilter).toHaveBeenCalledWith('ruim')

    fireEvent.click(screen.getByText('péssimo'))
    expect(defaultProps.handleQualityFilter).toHaveBeenCalledWith('péssimo')

    expect(defaultProps.handleQualityFilter).toHaveBeenCalledTimes(4)
  })

  it('applies active state to selected filters', () => {
    customRender(<QualityFilter {...defaultProps} qualityFilters={['bom', 'ruim']} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true')
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'false')
    expect(buttons[2]).toHaveAttribute('aria-pressed', 'true')
    expect(buttons[3]).toHaveAttribute('aria-pressed', 'false')
  })

  it('shows checkmark icons for selected filters when showCheckmark is true', () => {
    const { Check: CheckMock } = jest.requireMock('phosphor-react')

    customRender(
      <QualityFilter
        {...defaultProps}
        qualityFilters={['bom', 'moderado']}
        config={{ showCheckmark: true }}
      />
    )

    expect(CheckMock).toHaveBeenCalledTimes(2)
    expect(screen.getAllByTestId('check-icon')).toHaveLength(2)
  })

  it('does not show checkmark icons when showCheckmark is false', () => {
    const { Check: CheckMock } = jest.requireMock('phosphor-react')

    customRender(
      <QualityFilter
        {...defaultProps}
        qualityFilters={['bom', 'moderado']}
        config={{ showCheckmark: false }}
      />
    )

    expect(CheckMock).not.toHaveBeenCalled()
    expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument()
  })

  it('applies proper data attributes for testing and styling', () => {
    customRender(<QualityFilter {...defaultProps} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveAttribute('data-quality', 'bom')
    expect(buttons[1]).toHaveAttribute('data-quality', 'moderado')
    expect(buttons[2]).toHaveAttribute('data-quality', 'ruim')
    expect(buttons[3]).toHaveAttribute('data-quality', 'péssimo')
  })

  it('applies correct accessibility attributes', () => {
    customRender(<QualityFilter {...defaultProps} />)

    expect(screen.getByLabelText('Filtros de qualidade do ar')).toBeInTheDocument()

    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-pressed')
    })
  })

  it('updates correctly when qualityFilters prop changes', () => {
    const { rerender } = customRender(<QualityFilter {...defaultProps} />)

    expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument()

    rerender(<QualityFilter {...defaultProps} qualityFilters={['bom', 'péssimo']} />)

    expect(screen.getAllByTestId('check-icon')).toHaveLength(2)

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true')
    expect(buttons[3]).toHaveAttribute('aria-pressed', 'true')
  })
})
