import { List, MapPin } from 'phosphor-react'
import * as S from './styles'

interface ViewToggleProps {
  setViewMode: (viewMode: 'map' | 'list') => void
  viewMode: 'map' | 'list'
}

export function ViewToggle({ setViewMode, viewMode }: ViewToggleProps) {
  return (
    <S.ViewToggleContainer>
      <p>Modo de visualização</p>
      <S.ViewToggleButtonContainer>
        <S.ViewToggleButton onClick={() => setViewMode('map')} isActive={viewMode === 'map'}>
          <MapPin size={16} weight="fill" />
          Mapa
        </S.ViewToggleButton>
        <S.ViewToggleButton onClick={() => setViewMode('list')} isActive={viewMode === 'list'}>
          <List size={16} />
          Lista
        </S.ViewToggleButton>
      </S.ViewToggleButtonContainer>
    </S.ViewToggleContainer>
  )
}
