import { useTheme } from '@context/ThemeContext'
import { Moon, Sun } from 'phosphor-react'
import * as S from './styles'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <S.SwitchContainer onClick={toggleTheme}>
      <S.ToggleThumb themeMode={theme}>
        {theme === 'light' ? (
          <Moon size={30} color="#FFF" data-icon="moon" data-testid="theme-icon" />
        ) : (
          <Sun size={30} data-icon="sun" data-testid="theme-icon" />
        )}
      </S.ToggleThumb>
    </S.SwitchContainer>
  )
}
