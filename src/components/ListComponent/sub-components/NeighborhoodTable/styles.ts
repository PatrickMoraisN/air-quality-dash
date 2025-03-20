import { fadeIn } from '@styles/global'
import styled, { css } from 'styled-components'

export const ErrorText = styled.p`
  color: #403f3f;
  font-size: 3rem;
  margin-top: 32px;
`

export const TableContainer = styled.div`
  width: 100%;
  max-width: 950px;
  overflow-x: auto;
  margin: 0 auto;
  margin-top: 1rem;
  padding: 0 12px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => (theme.mode === 'light' ? '#E0E0E0' : '#2E2E2E')};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #909090;
  }

  animation: ${fadeIn} 0.8s;
`

export const NeighborhoodTable = styled.table`
  max-width: 950px;
  min-width: 600px;
  width: 80%;
  border-collapse: collapse;
  margin: 0 auto;
`

export const TableHead = styled.thead`
  background: #2a2a2a;
  color: #f0f0f0;

  ${({ theme }) =>
    theme.mode === 'light' &&
    css`
      background: linear-gradient(90deg, #3a6ea5 0%, #74b3ce 100%);
    `}
`

export const TableRow = styled.tr`
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`
export const TableHeader = styled.th`
  padding: 1rem;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

export const TableBody = styled.tbody``
export const TableData = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
`
