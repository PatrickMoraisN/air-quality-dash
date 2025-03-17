import { render, screen } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import { Header } from '@components/Header'
import { ThemeProvider } from '@context/ThemeContext'

describe('Header Component', () => {
  it('should render the header correctly', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    )

    expect(screen.getByRole('heading', { name: /air quality/i })).toBeInTheDocument()
    expect(screen.getByTestId('header-logo-icon')).toBeInTheDocument()
    waitFor(() => {
      expect(screen.getByTestId('theme-switcher')).toBeInTheDocument()
    })
  })
})
