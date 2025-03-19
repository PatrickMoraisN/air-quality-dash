import { ResponsiveContainer } from 'recharts'
import styled from 'styled-components'

export const StyledLinearGradient = styled.linearGradient`
  stop:nth-child(1) {
    stop-color: ${({ theme }) => theme.chart.stopOne};
    stop-opacity: 0.7;
  }

  stop:nth-child(2) {
    stop-color: ${({ theme }) => theme.chart.stopTwo};
    stop-opacity: 0.5;
  }

  stop:nth-child(3) {
    stop-color: ${({ theme }) => theme.chart.stopThree};
    stop-opacity: 0.3;
  }
`

export const ChartContainer = styled(ResponsiveContainer)`
  width: 90%;
  margin: 0 auto;
`
