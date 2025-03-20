import { fadeRight } from '@styles/global'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.text};
  padding: 2rem 12px;
  text-align: center;
`

export const HeaderContent = styled.div`
  max-width: 1100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h1 {
    font-size: 1.5rem;
    font-style: italic;
  }

  animation: ${fadeRight} 0.8s;
`
