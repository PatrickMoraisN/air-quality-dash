import styled from 'styled-components'

export const ViewToggleContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;

  p {
    font-size: 16px;
    font-weight: bold;
    color: #787878;
  }
`

type ViewToggleButtonProps = {
  isActive: boolean
}

export const ViewToggleButton = styled.button<ViewToggleButtonProps>`
  background-color: ${({ isActive }) => (isActive ? '#3A6EA5' : 'white')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  border: 1px solid #3a6ea5;
  padding: 6px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: filter 0.2s;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.9);
  }
`

export const ViewToggleButtonContainer = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 12px;
  justify-content: center;
`
