export const lightTheme = {
  mode: 'light',
  background: '#F5F5F5',
  text: '#222',
  primary: '#555555',
  header: '#FFFFFF',
  inputBackground: '#FFFFFF',
  tooltipBg: '#FFFFFF',
  tooltipText: '#000000',
  chart: {
    stopOne: '##004a99',
    stopTwo: '#014996',
    stopThree: '#489af3',
  },
  qualityText: {
    selected: '#B8E0D2',
    background: '#E6E6E6',
  },
} as const

export const darkTheme = {
  mode: 'dark',
  background: '#1E1E1E',
  text: '#EAEAEA',
  primary: '#2A2A2A',
  header: '#333333',
  inputBackground: '#333333',
  tooltipBg: '#333333',
  tooltipText: '#FFFFFF',
  chart: {
    stopOne: '#FFF',
    stopTwo: '#FFF',
    stopThree: '#1E1E1E',
  },
  qualityText: {
    selected: '#285E61',
    background: '#2a2a2a',
  },
} as const
