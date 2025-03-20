import { TooltipProps } from 'recharts'
import * as S from './styles'

export const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return <p>Qualidade</p>

  const qualityParser: Record<number, string> = {
    1: 'Péssimo',
    2: 'Ruim',
    3: 'Moderado',
    4: 'Bom',
  }

  return (
    <S.CustomTooltipContainer>
      <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
      <p style={{ margin: 0 }}>
        Qualidade:{' '}
        {payload[0].value !== undefined ? qualityParser[payload[0].value] : 'Desconhecida'}
      </p>
    </S.CustomTooltipContainer>
  )
}
