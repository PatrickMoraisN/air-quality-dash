import { render, screen } from '@testing-library/react'
import { CustomTooltip } from '..'

interface CustomTooltipProps {
  active: boolean
  payload?: { value: number | undefined }[]
}

const renderCustomTooltip = ({ active, payload = [] }: CustomTooltipProps) => {
  return render(<CustomTooltip active={active} payload={payload} label="Test Label" />)
}

describe('CustomTooltip Component', () => {
  it('renders "Qualidade" when inactive', () => {
    renderCustomTooltip({ active: false })
    expect(screen.getByText('Qualidade')).toBeInTheDocument()
  })

  it('renders "Qualidade" when payload is empty', () => {
    renderCustomTooltip({ active: true })
    expect(screen.getByText('Qualidade')).toBeInTheDocument()
  })

  it('displays the correct quality for known values', () => {
    const mockPayload = [{ value: 4 }]
    renderCustomTooltip({ active: true, payload: mockPayload })

    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Qualidade: Bom')).toBeInTheDocument()
  })

  it('displays "Desconhecida" when value is not in the parser', () => {
    const mockPayload = [{ value: undefined }]
    renderCustomTooltip({ active: true, payload: mockPayload })

    expect(screen.getByText('Qualidade: Desconhecida')).toBeInTheDocument()
  })

  it('renders nothing if payload is undefined', () => {
    renderCustomTooltip({ active: true })
    expect(screen.getByText('Qualidade')).toBeInTheDocument()
  })
})
