import { Check } from 'phosphor-react'
import { useMemo } from 'react'
import { useTheme } from 'styled-components'
import * as S from './styles'

export type QualityLevel = 'bom' | 'moderado' | 'ruim' | 'péssimo'

interface QualityFilterProps {
  handleQualityFilter: (quality: QualityLevel) => void
  qualityFilters: QualityLevel[]
  config?: {
    showCheckmark?: boolean
  }
}

interface CheckIconProps {
  color: string
}

const CheckIcon = ({ color }: CheckIconProps) => <Check size={12} color={color} weight="bold" />

export function QualityFilter({
  handleQualityFilter,
  qualityFilters,
  config = { showCheckmark: true },
}: QualityFilterProps) {
  const qualityLevels: QualityLevel[] = useMemo(() => ['bom', 'moderado', 'ruim', 'péssimo'], [])
  const theme = useTheme() as { mode: 'light' | 'dark' }
  const checkIconsColors = {
    light: '#2D4A43',
    dark: '#F4F4F4',
  } as const

  const getLabel = (quality: QualityLevel) => {
    if (config.showCheckmark && qualityFilters.includes(quality)) {
      return (
        <>
          <CheckIcon color={checkIconsColors[theme.mode]} /> {quality}
        </>
      )
    }
    return quality
  }

  return (
    <>
      <S.FilterContainer aria-label="Filtros de qualidade do ar">
        {qualityLevels.map(quality => (
          <S.QualityButton
            key={quality}
            onClick={() => handleQualityFilter(quality)}
            isActive={qualityFilters.includes(quality)}
            aria-pressed={qualityFilters.includes(quality)}
            data-quality={quality}
          >
            {getLabel(quality)}
          </S.QualityButton>
        ))}
      </S.FilterContainer>
    </>
  )
}
