import { Dialog, DialogBody } from '@chakra-ui/react'
import { AirQualityText } from '@components/AirQualityText'
import AirQualityTextType from '@utils/airQuality'
import { AirQualityChart } from '../AirQualityChart'
import * as S from './styles'

interface QualityHistoryProps {
  [key: string]: 'bom' | 'moderado' | 'ruim' | 'péssimo'
}

interface SelectedNeighborhood {
  name: string
  actual_quality: string
  history: QualityHistoryProps
}

interface NeighborhoodPopupProps {
  selectedNeighborhood: SelectedNeighborhood | null
  isPopupOpen: boolean
  closeModal: () => void
}

export function NeighborhoodPopup({
  selectedNeighborhood,
  isPopupOpen,
  closeModal,
}: NeighborhoodPopupProps) {
  return (
    <>
      <Dialog.Root open={isPopupOpen} onOpenChange={closeModal}>
        <S.DialogOverlay />

        <S.DialogContent scrollBehavior="inside">
          <Dialog.CloseTrigger asChild onClick={closeModal}>
            <S.CloseBtn size="sm" />
          </Dialog.CloseTrigger>
          <DialogBody>
            <S.DialogHeader>{selectedNeighborhood?.name}</S.DialogHeader>
            <S.DialogText>A qualidade do ar atual é:</S.DialogText>
            <AirQualityText
              airQuality={selectedNeighborhood?.actual_quality as AirQualityTextType}
              variant="popup"
            />
            <S.RecentMeasurementsText>Medições recentes:</S.RecentMeasurementsText>
            {selectedNeighborhood && (
              <AirQualityChart history={selectedNeighborhood.history as QualityHistoryProps} />
            )}
          </DialogBody>
        </S.DialogContent>
      </Dialog.Root>
    </>
  )
}
