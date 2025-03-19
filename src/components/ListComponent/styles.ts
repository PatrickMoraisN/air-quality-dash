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
`

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
  position: absolute;
  top: 80px;
`
