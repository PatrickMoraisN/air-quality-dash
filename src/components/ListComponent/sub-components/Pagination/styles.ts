import styled from 'styled-components'

export const PaginationComponent = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 2rem;
  width: 80%;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    font-size: 0.4rem;
    width: 300px;
  }
`

export const hoverStyle = {
  bg: 'gray.100',
  color: 'gray.800',
  _dark: { bg: 'gray.700', color: 'gray.300' },
}

export const activeStyle = {
  bg: 'gray.600',
  color: 'white',
  _dark: { bg: 'gray.300', color: 'black' },
}

export const selectedStyle = {
  bg: 'gray.600',
  color: 'white',
  _dark: { bg: 'gray.300', color: 'black' },
}
