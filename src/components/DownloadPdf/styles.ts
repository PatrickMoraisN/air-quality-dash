import { Button } from '@chakra-ui/react'
import styled from 'styled-components'

export const DownloadPdfButton = styled(Button)`
  margin-top: 0.2rem;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: linear-gradient(90deg, #3a6ea5 0%, rgb(0, 76, 109) 100%);
  color: #f0f0f0;

  &:hover {
    filter: brightness(0.8);
  }

  @media (max-width: 425px) {
    margin-top: 10px;
    width: 80%;
  }
`

export const DownloadPdfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  p {
    font-size: 16px;
    font-weight: bold;
    color: #787878;

    @media (max-width: 420px) {
      display: none;
    }
  }
`
