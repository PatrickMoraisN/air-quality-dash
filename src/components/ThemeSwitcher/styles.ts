import styled from 'styled-components'

export const SwitchContainer = styled.button`
  width: 60px;
  height: 28px;
  background-color: ${({ theme }) => theme.cardBackground};
  border: 2px solid ${({ theme }) => theme.textSecondary};
  border-radius: 50px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
`

export const ToggleThumb = styled.div<{ themeMode: string }>`
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => theme.text};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ themeMode }) => (themeMode === 'light' ? '5px' : 'calc(100% - 25px)')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    left 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
`
