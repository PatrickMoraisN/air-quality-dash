import { fireEvent, render, screen } from '@testing-library/react'
import { ViewToggle } from '..'

describe('ViewToggle Component', () => {
  it('renders correctly with default props', () => {
    render(<ViewToggle setViewMode={jest.fn()} viewMode="map" />)

    expect(screen.getByText(/modo de visualização/i)).toBeInTheDocument()
    expect(screen.getByText(/Mapa/i)).toBeInTheDocument()
    expect(screen.getByText(/Lista/i)).toBeInTheDocument()
  })

  it('highlights the correct button based on viewMode', () => {
    const { rerender } = render(<ViewToggle setViewMode={jest.fn()} viewMode="map" />)

    const mapButton = screen.getByText(/Mapa/i)
    const listButton = screen.getByText(/Lista/i)

    const isActiveColor = 'rgb(58, 110, 165)'
    const isDefaultColor = 'white'

    expect(getComputedStyle(mapButton).backgroundColor).toBe(isActiveColor)
    expect(getComputedStyle(listButton).backgroundColor).not.toBe(isActiveColor)

    rerender(<ViewToggle setViewMode={jest.fn()} viewMode="list" />)

    expect(getComputedStyle(listButton).backgroundColor).not.toBe(isDefaultColor)
    expect(getComputedStyle(mapButton).backgroundColor).toBe(isDefaultColor)
  })

  it('calls setViewMode when clicking on buttons', () => {
    const setViewModeMock = jest.fn()

    render(<ViewToggle setViewMode={setViewModeMock} viewMode="map" />)

    const listButton = screen.getByText(/Lista/i)
    fireEvent.click(listButton)

    expect(setViewModeMock).toHaveBeenCalledTimes(1)
    expect(setViewModeMock).toHaveBeenCalledWith('list')

    const mapButton = screen.getByText(/Mapa/i)
    fireEvent.click(mapButton)

    expect(setViewModeMock).toHaveBeenCalledTimes(2)
    expect(setViewModeMock).toHaveBeenCalledWith('map')
  })
})
