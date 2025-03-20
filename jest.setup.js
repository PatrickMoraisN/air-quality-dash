import '@testing-library/jest-dom'

if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = obj => {
    if (obj === undefined) return undefined
    return JSON.parse(JSON.stringify(obj))
  }
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

jest.mock('@react-pdf/renderer', () => ({
  Document: ({ children }) => <div data-testid="pdf-document">{children}</div>,
  Page: ({ children, size, style }) => (
    <div data-testid="pdf-page" data-size={size} style={style}>
      {children}
    </div>
  ),
  Text: ({ children, style }) => <span style={style}>{children}</span>,
  View: ({ children, style }) => <div style={style}>{children}</div>,
  StyleSheet: {
    create: styles => styles,
  },
  Svg: ({ children, width, height, viewBox }) => (
    <svg width={width} height={height} viewBox={viewBox}>
      {children}
    </svg>
  ),
  Path: ({ d }) => <path d={d} />,
  renderToString: jest.fn(),
}))
