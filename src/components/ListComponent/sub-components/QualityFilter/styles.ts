import styled from 'styled-components'

interface QualityButtonProps {
  isActive: boolean
}

export const QualityButton = styled.button<QualityButtonProps>`
  text-transform: capitalize;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.qualityText.selected : theme.qualityText.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.5rem;
  }
`

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3.5rem;

  @media (max-width: 768px) {
    gap: 4px;
  }
`

export const FilterTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #787878;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 32%;
`
