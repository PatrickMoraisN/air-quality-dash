import * as S from './styles'

interface PayloadProps {
  value: number
}

interface CustomToolTipProps {
  active: boolean
  payload: PayloadProps[]
  label: string
}

export const CustomTooltip = ({ active, payload, label }: CustomToolTipProps) => {
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
      <p style={{ margin: 0 }}>Qualidade: {qualityParser[payload[0].value]}</p>
    </S.CustomTooltipContainer>
  )
}
