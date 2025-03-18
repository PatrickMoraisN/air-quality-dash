import { ThemeProvider } from '@context/ThemeContext'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeSwitcher } from '..'

describe('ThemeSwitcher Component', () => {
  it('renders ThemeSwitcher correctly', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('change theme correctly', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')

    expect(screen.getByTestId('theme-icon')).toHaveAttribute('data-icon', 'moon')
    fireEvent.click(button)
    expect(screen.getByTestId('theme-icon')).toHaveAttribute('data-icon', 'sun')
  })
})
