/* eslint-disable @typescript-eslint/prefer-as-const */
import { render } from '@testing-library/react'
import { AirQualityPdf } from '..'

describe('AirQualityPdf', () => {
  it('renders empty state message when no neighborhoods are provided', () => {
    const { getByText, getByTestId } = render(<AirQualityPdf neighborhoods={[]} />)

    expect(getByTestId('pdf-document')).toBeInTheDocument()
    expect(getByTestId('pdf-page')).toHaveAttribute('data-size', 'A4')
    expect(getByText('Nenhum dado disponível para gerar o PDF')).toBeInTheDocument()
  })

  it('renders neighborhood information when data is provided', () => {
    const mockNeighborhoods = [
      {
        name: 'Centro',
        actual_quality: 'bom',
        history: {
          '2023-01-01T00:00:00.000Z': 'bom' as 'bom',
          '2023-01-02T00:00:00.000Z': 'moderado' as 'moderado',
        },
      },
    ]

    const { getByText } = render(<AirQualityPdf neighborhoods={mockNeighborhoods} />)

    expect(getByText('Relatório de Qualidade do Ar')).toBeInTheDocument()
    expect(getByText('Bairro: Centro')).toBeInTheDocument()
    expect(getByText(/Qualidade Atual: bom/)).toBeInTheDocument()
    expect(getByText('Histórico de Qualidade do Ar')).toBeInTheDocument()
  })

  it('renders multiple neighborhoods when multiple entries are provided', () => {
    const mockNeighborhoods = [
      {
        name: 'Centro',
        actual_quality: 'bom',
        history: {},
      },
      {
        name: 'Liberdade',
        actual_quality: 'moderado',
        history: {},
      },
    ]

    const { getByText } = render(<AirQualityPdf neighborhoods={mockNeighborhoods} />)

    expect(getByText('Bairro: Centro')).toBeInTheDocument()
    expect(getByText(/Qualidade Atual: bom/)).toBeInTheDocument()
    expect(getByText('Bairro: Liberdade')).toBeInTheDocument()
    expect(getByText(/Qualidade Atual: moderado/)).toBeInTheDocument()
  })

  it('does not render history section when no history is provided', () => {
    const mockNeighborhoods = [
      {
        name: 'Centro',
        actual_quality: 'bom',
        history: {},
      },
    ]

    const { getByText, queryByText } = render(<AirQualityPdf neighborhoods={mockNeighborhoods} />)

    expect(getByText('Bairro: Centro')).toBeInTheDocument()
    expect(queryByText('Histórico de Qualidade do Ar')).not.toBeInTheDocument()
  })
})
