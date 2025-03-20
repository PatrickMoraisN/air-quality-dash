import { AirQualityText } from '@components/AirQualityText'
import { NeighborhoodPopup } from '@components/NeighborhoodPopup'
import AirQualityTextType from '@utils/airQuality'
import { format } from 'date-fns'
import { useState } from 'react'
import * as S from './styles'

interface QualityHistoryProps {
  [key: string]: 'bom' | 'moderado' | 'ruim' | 'péssimo'
}

interface SelectedNeighborhood {
  name: string
  actual_quality: string
  history: QualityHistoryProps
}

interface NeighborhoodTableProps {
  neighborhoods: SelectedNeighborhood[]
}

export function NeighborhoodTable({ neighborhoods }: NeighborhoodTableProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<SelectedNeighborhood | null>(
    null
  )

  if (!neighborhoods || !neighborhoods.length) {
    return <S.ErrorText>Bairro não encontrado</S.ErrorText>
  }

  const handleRowClick = (neighborhood: SelectedNeighborhood) => {
    setSelectedNeighborhood(neighborhood)
    setIsPopupOpen(true)
  }

  const closeModal = () => {
    setIsPopupOpen(false)
    setSelectedNeighborhood(null)
  }

  return (
    <S.TableContainer>
      <S.NeighborhoodTable>
        <S.TableHead>
          <S.TableRow>
            <S.TableHeader>Bairro</S.TableHeader>
            <S.TableHeader>Qualidade do ar</S.TableHeader>
            <S.TableHeader>Data</S.TableHeader>
          </S.TableRow>
        </S.TableHead>
        <S.TableBody>
          {neighborhoods.map(neighborhood => (
            <S.TableRow key={neighborhood.name} onClick={() => handleRowClick(neighborhood)}>
              <S.TableData>{neighborhood.name}</S.TableData>
              <S.TableData>
                <AirQualityText airQuality={neighborhood.actual_quality as AirQualityTextType} />
              </S.TableData>
              <S.TableData>{format(new Date(), 'dd/MM/yyyy')}</S.TableData>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.NeighborhoodTable>

      <NeighborhoodPopup
        selectedNeighborhood={selectedNeighborhood ?? null}
        isPopupOpen={isPopupOpen}
        closeModal={closeModal}
      />
    </S.TableContainer>
  )
}
