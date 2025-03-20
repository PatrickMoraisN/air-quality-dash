import { fadeIn } from '@styles/global'
import styled from 'styled-components'

export const HomeLayoutContainer = styled.div`
  gap: 2rem;
  text-align: center;
  padding-bottom: 24px;
`

export const PrincipalText = styled.h2`
  margin-top: 48px;
  font-size: 1.5rem;
  font-style: italic;

  animation: ${fadeIn} 0.8s;
`
