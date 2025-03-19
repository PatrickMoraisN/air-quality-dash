import styled, { css } from 'styled-components'

export type airQualityTextProps = {
  airQuality: 'bom' | 'moderado' | 'ruim' | 'péssimo'
  variant?: 'popup'
}

export const QualityText = styled.span<airQualityTextProps>`
  padding: 8px;
  border-radius: 8px;
  color: #000;
  background: ${({ airQuality }) => {
    switch (airQuality) {
      case 'bom':
        return '#A8E6A2'
      case 'moderado':
        return '#F7E29A'
      case 'ruim':
        return '#F4B183'
      case 'péssimo':
        return '#E57373'
      default:
        return '#D3D3D3'
    }
  }};

  ${({ variant }) =>
    variant === 'popup' &&
    css`
      display: block;
      width: 70%;
      font-size: 2rem;
      margin: 0 auto;
      margin-top: 1rem;
    `}
`
