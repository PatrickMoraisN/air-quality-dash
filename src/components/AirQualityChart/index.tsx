import { formatHistoryData } from '@utils/formatHistoryData'
import { Area, AreaChart, CartesianGrid, Line, Tooltip, XAxis, YAxis } from 'recharts'
import * as S from './styles'
import { CustomTooltip } from './sub-components/CustomTooltip'

interface AirQualityChartProps {
  history: {
    [key: string]: 'bom' | 'moderado' | 'ruim' | 'péssimo'
  }
}

export const AirQualityChart = ({ history }: AirQualityChartProps) => {
  const chartData = formatHistoryData(history)

  return (
    <S.ChartContainer width="90%" height={300}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="date" tick={{ fill: '#494949', fontSize: 12 }} />
        <YAxis
          tickFormatter={value => {
            const labels: { [key: number]: string } = {
              1: 'Péssimo',
              2: 'Ruim',
              3: 'Moderado',
              4: 'Bom',
            }
            return labels[value] || ''
          }}
          domain={[0, 4]}
          tickCount={5}
          tick={{ fill: '#666', fontSize: 12 }}
        />
        <Tooltip content={CustomTooltip} />

        <defs>
          <S.StyledLinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#004a99" stopOpacity={0.7} />
            <stop offset="50%" stopColor="#014996" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#489af3" stopOpacity={0.3} />
          </S.StyledLinearGradient>

          <linearGradient id="colorQuality" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1d3146" stopOpacity={1} />
            <stop offset="100%" stopColor="#35b2e7" stopOpacity={1} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="quality"
          stroke="none"
          fill="url(#areaGradient)"
          fillOpacity={1}
        />

        <Line
          type="monotone"
          dataKey="quality"
          stroke="url(#colorQuality)"
          strokeWidth={4}
          strokeLinecap="round"
          dot={{ r: 6, strokeWidth: 2, fill: 'white', stroke: '#263d55' }}
          activeDot={{ r: 8, fill: '#318ae9', stroke: 'white', strokeWidth: 2 }}
        />
      </AreaChart>
    </S.ChartContainer>
  )
}
