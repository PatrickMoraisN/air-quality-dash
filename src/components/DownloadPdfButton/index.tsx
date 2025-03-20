import { pdf } from '@react-pdf/renderer'
import { DownloadSimple } from 'phosphor-react'
import * as S from './styles'
import { AirQualityPdf } from './sub-components/AirQualityPdf'

interface QualityHistoryProps {
  [key: string]: 'bom' | 'moderado' | 'ruim' | 'péssimo'
}

interface SearchedNeighborhoodProps {
  name: string
  actual_quality: string
  history: QualityHistoryProps
}

interface DownloadPdfProps {
  neighborhoods: SearchedNeighborhoodProps[]
}

export const DownloadPdfButton = ({ neighborhoods }: DownloadPdfProps) => {
  const handleDownload = async () => {
    if (!neighborhoods.length) return

    let url = ''
    try {
      const blob = await pdf(<AirQualityPdf neighborhoods={neighborhoods} />).toBlob()
      url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `qualidade_do_ar_${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error)
    } finally {
      if (url) URL.revokeObjectURL(url)
    }
  }

  return (
    <S.DownloadPdfContainer>
      <p>Baixar essa página</p>
      <S.DownloadPdfButton
        colorScheme="blue"
        onClick={handleDownload}
        disabled={!neighborhoods.length}
      >
        <DownloadSimple size={32} color="#fafafa" />
        Baixar PDF
      </S.DownloadPdfButton>
    </S.DownloadPdfContainer>
  )
}
