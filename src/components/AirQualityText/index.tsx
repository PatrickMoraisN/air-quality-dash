import AirQualityTextType from '@utils/airQuality'
import * as S from './styles'

interface AirQualityTextProps {
  airQuality: AirQualityTextType
  variant?: 'popup'
}

export function AirQualityText({ airQuality, variant }: AirQualityTextProps) {
  return (
    <S.QualityText airQuality={airQuality} variant={variant}>
      {airQuality}
    </S.QualityText>
  )
}
