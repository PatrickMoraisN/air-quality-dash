import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { PaginationComponent } from '..'

const customRender = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

describe('PaginationComponent', () => {
  const mockOnPageChange = jest.fn()
  const showPaginationMock = jest.fn(() => true)

  afterEach(() => {
    jest.clearAllMocks()
  })

  const leftButtonTestId = 'chevron-left'
  const rightButtonTestId = 'chevron-right'

  it('matches snapshot', () => {
    const { asFragment } = customRender(
      <PaginationComponent
        totalPages={5}
        page={1}
        onPageChange={mockOnPageChange}
        showPagination={showPaginationMock}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly when showPagination is true', () => {
    customRender(
      <PaginationComponent
        totalPages={5}
        page={1}
        onPageChange={mockOnPageChange}
        showPagination={showPaginationMock}
      />
    )

    expect(screen.getByTestId(leftButtonTestId)).toBeInTheDocument()
    expect(screen.getByTestId(rightButtonTestId)).toBeInTheDocument()
  })

  it('does not render when showPagination is false', () => {
    showPaginationMock.mockReturnValueOnce(false)

    const { container } = customRender(
      <PaginationComponent
        totalPages={5}
        page={1}
        onPageChange={mockOnPageChange}
        showPagination={showPaginationMock}
      />
    )

    expect(container.firstChild).toBeNull()
  })

  it('calls onPageChange when next page button is clicked', () => {
    customRender(
      <PaginationComponent
        totalPages={5}
        page={1}
        onPageChange={mockOnPageChange}
        showPagination={showPaginationMock}
      />
    )

    const nextButton = screen.getByTestId(rightButtonTestId)
    fireEvent.click(nextButton)

    waitFor(() => {
      expect(mockOnPageChange).toHaveBeenCalled()
    })
  })

  it('calls onPageChange when previous page button is clicked', () => {
    customRender(
      <PaginationComponent
        totalPages={5}
        page={2}
        onPageChange={mockOnPageChange}
        showPagination={showPaginationMock}
      />
    )

    const prevButton = screen.getByTestId(leftButtonTestId)
    fireEvent.click(prevButton)

    waitFor(() => {
      expect(mockOnPageChange).toHaveBeenCalled()
    })
  })
})
