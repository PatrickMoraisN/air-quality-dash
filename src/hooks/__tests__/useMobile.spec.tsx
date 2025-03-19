import { renderHook } from '@testing-library/react'

import { useMobile } from '../useMobile'

describe('useMobile Hook', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => {
        const matches = parseInt(query.match(/\d+/)?.[0] || '0', 10) >= 500
        return {
          matches,
          media: query,
          onchange: null,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          addListener: jest.fn(),
          removeListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }
      }),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns true when viewport is smaller than breakpoint (mobile mode)', () => {
    ;(window.matchMedia as jest.Mock).mockImplementation(query => {
      const width = parseInt(query.match(/\d+/)?.[0] || '0', 10)
      return {
        matches: width >= 800,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }
    })

    const { result } = renderHook(() => useMobile(800))
    expect(result.current[0]).toBe(true)
  })

  it('returns false when viewport is bigger than breakpoint (desktop mode)', () => {
    ;(window.matchMedia as jest.Mock).mockImplementation(query => {
      const width = parseInt(query.match(/\d+/)?.[0] || '0', 10)
      return {
        matches: width >= 300,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }
    })

    const { result } = renderHook(() => useMobile(200))
    expect(result.current[0]).toBe(false)
  })

  it('updates when screen width changes', () => {
    const currentMatches = false

    const mockMatchMedia = (query: string) => {
      return {
        matches: currentMatches,
        media: query,
        onchange: null,
        addEventListener: (event: string, callback: EventListener) => {
          if (event === 'change') {
            setTimeout(() => callback({ matches: currentMatches } as MediaQueryListEvent), 0)
          }
        },
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }
    }

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn(mockMatchMedia),
    })

    const { result } = renderHook(() => useMobile(448))

    expect(result.current[0]).toBe(false)
  })

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerMock = jest.fn()

    const mockMatchMedia = window.matchMedia as jest.Mock
    mockMatchMedia.mockImplementation(() => ({
      matches: true,
      media: '(max-width: 448px)',
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerMock,
    }))

    const { unmount } = renderHook(() => useMobile(448))
    unmount()

    expect(removeEventListenerMock).toHaveBeenCalled()
  })
})
