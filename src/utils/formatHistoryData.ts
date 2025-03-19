import { format } from 'date-fns'

interface HistoryData {
  [key: string]: 'bom' | 'moderado' | 'ruim' | 'péssimo'
}

interface ChartData {
  date: string
  quality: number
}

const qualityMapping: { [key in 'bom' | 'moderado' | 'ruim' | 'péssimo']: number } = {
  bom: 4,
  moderado: 3,
  ruim: 2,
  péssimo: 1,
}

export const formatHistoryData = (history: HistoryData): ChartData[] => {
  return Object.entries(history)
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
    .map(([date, quality]) => ({
      date: format(new Date(date), 'dd/MM'),
      quality: qualityMapping[quality],
    }))
}
