import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'
import { SkeletonComponent } from '..'

const customRender = (ui: React.ReactElement) => {
  return render(<ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>)
}

describe('SkeletonComponent', () => {
  it('renders correctly', () => {
    customRender(<SkeletonComponent />)

    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('applies default height and width', () => {
    customRender(<SkeletonComponent />)

    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveStyle({ height: '400px', width: '400px' })
  })

  it('applies custom height and width', () => {
    customRender(<SkeletonComponent height="500px" width="300px" />)

    const skeleton = screen.getByTestId('skeleton')
    expect(skeleton).toHaveStyle({ height: '500px', width: '300px' })
  })
})
