import styled from 'styled-components'

export const PaginationComponent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
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
