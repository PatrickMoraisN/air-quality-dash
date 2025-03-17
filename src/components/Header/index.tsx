import { ThemeSwitcher } from '@components/ThemeSwitcher'
import { Wind } from 'phosphor-react'
import * as S from './styles'

export function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.HeaderLogo>
          <Wind size={32} color="#2d34f0" weight="fill" data-testid="header-logo-icon" />
          <h1>Air Quality</h1>
        </S.HeaderLogo>
        <ThemeSwitcher data-testid="theme-switcher" />
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}
