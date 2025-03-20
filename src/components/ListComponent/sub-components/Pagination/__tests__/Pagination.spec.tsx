import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { PaginationComponent } from '..'

const customRender = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

describe('PaginationComponent', () => {
  const mockOnPageChange = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  const leftButtonTestId = 'chevron-left'
  const rightButtonTestId = 'chevron-right'

  it('matches snapshot', () => {
    const { asFragment } = customRender(
      <PaginationComponent totalPages={5} page={1} onPageChange={mockOnPageChange} />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when showPagination is true', () => {
    customRender(<PaginationComponent totalPages={5} page={1} onPageChange={mockOnPageChange} />)

    expect(screen.getByTestId(leftButtonTestId)).toBeInTheDocument()
    expect(screen.getByTestId(rightButtonTestId)).toBeInTheDocument()
  })

  it('calls onPageChange when next page button is clicked', () => {
    customRender(<PaginationComponent totalPages={5} page={1} onPageChange={mockOnPageChange} />)

    const nextButton = screen.getByTestId(rightButtonTestId)
    fireEvent.click(nextButton)

    waitFor(() => {
      expect(mockOnPageChange).toHaveBeenCalled()
    })
  })

  it('calls onPageChange when previous page button is clicked', () => {
    customRender(<PaginationComponent totalPages={5} page={2} onPageChange={mockOnPageChange} />)

    const prevButton = screen.getByTestId(leftButtonTestId)
    fireEvent.click(prevButton)

    waitFor(() => {
      expect(mockOnPageChange).toHaveBeenCalled()
    })
  })
})
