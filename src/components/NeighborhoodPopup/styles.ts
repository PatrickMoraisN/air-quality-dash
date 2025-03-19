import { CloseButton, Dialog } from '@chakra-ui/react'
import styled from 'styled-components'

export const DialogOverlay = styled(Dialog.Backdrop)`
  background-color: rgba(0, 0, 0, 0.5);
`

export const DialogContent = styled(Dialog.Content)`
  background-color: ${({ theme }) => theme.background};
  border-radius: 0.5rem;
  padding: 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 600px;
  max-width: 600px;
  width: 90%;
`

export const DialogHeader = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  margin-top: 3rem;
`

export const DialogText = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 3rem;
`

export const RecentMeasurementsText = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 1rem;
`

export const CloseBtn = styled(CloseButton)`
  color: ${({ theme }) => theme.text};
`
