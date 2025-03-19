import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AirQualityText } from '..'

describe('AirQualityText Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<AirQualityText airQuality="moderado" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the correct air quality text', () => {
    render(<AirQualityText airQuality="bom" />)

    const textElement = screen.getByText('bom')
    expect(textElement).toBeInTheDocument()
  })

  it('applies the correct styles based on air quality prop', () => {
    render(<AirQualityText airQuality="ruim" />)

    const textElement = screen.getByText('ruim')

    expect(textElement).toHaveAttribute('airQuality', 'ruim')
  })

  it('renders correctly with the "popup" variant', () => {
    render(<AirQualityText airQuality="péssimo" variant="popup" />)

    const textElement = screen.getByText('péssimo')
    expect(textElement).toBeInTheDocument()

    expect(textElement).toHaveAttribute('variant', 'popup')
  })
})
