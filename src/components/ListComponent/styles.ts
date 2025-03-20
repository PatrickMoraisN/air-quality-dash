import { fadeIn } from '@styles/global'
import styled from 'styled-components'

export const SearchForm = styled.form`
  max-width: 1100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 0 8px;
  margin: auto;

  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
    gap: 0px;
    margin-top: 1rem;
  }

  animation: ${fadeIn} 0.8s;
`

export const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const SearchInput = styled.input`
  width: 500px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.inputBackground};
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 425px) {
    width: 120%;
  }
`

export const SearchButton = styled.button`
  padding: 16px;
  border-radius: 5px;
  background: linear-gradient(90deg, #3a6ea5 0%, #74b3ce 100%);
  color: #f0f0f0;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  margin-top: 16px;
  transition: 0.3s ease;

  &:hover {
    filter: brightness(0.8);
  }

  @media (max-width: 425px) {
    margin-top: 10px;
    width: 80%;
  }
`

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
  position: absolute;
  top: 80px;
  left: 0;
  text-align: left;
`
