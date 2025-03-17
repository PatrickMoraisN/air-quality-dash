import { ThemeSwitcher } from '@components/ThemeSwitcher'
import { Wind } from 'phosphor-react'
import * as S from './styles'

export function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.HeaderLogo>
          <Wind size={32} color="#2d34f0" weight="fill" />
          <h1>Air Quality</h1>
        </S.HeaderLogo>
        <ThemeSwitcher />
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}
