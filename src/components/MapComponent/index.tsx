'use client'
import airQualityService from '@services/airQuality/airQualityApi'
import geoDataService from '@services/geoData/geoDataApi'
import { BairroFeature } from '@utils/geojson/geoData.types'
import { FeatureCollection } from 'geojson'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { GeoJSON, TileLayer } from 'react-leaflet'
import { NeighborhoodPopup } from '../NeighborhoodPopup'
import { SkeletonComponent } from '../Skeleton'
import * as S from './styles'

interface QualityHistoryProps {
  [key: string]: 'bom' | 'moderado' | 'ruim' | 'péssimo'
}

interface SelectedNeighborhoodProps {
  name: string
  actual_quality: string
  history: QualityHistoryProps
}

type LayerProps = { on: (arg0: { click: () => Promise<void> }) => void }

export const MapComponent = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<SelectedNeighborhoodProps | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getGeoData = async () => {
    const response = await geoDataService.getGeoDataJSON()
    setGeoData(response as FeatureCollection)
    setIsLoading(false)
  }

  const getNeighborhoodInfo = async (selectedNeighborhoodName: string) => {
    const response = await airQualityService.searchNeighborhoodByName(selectedNeighborhoodName)
    return response[0]
  }

  const onEachFeature = async (feature: BairroFeature, layer: LayerProps) => {
    if (feature.properties && feature.properties.NOME) {
      layer.on({
        click: async () => {
          const neighborhoodName = feature.properties.NOME
          const neighborhoodData = await getNeighborhoodInfo(neighborhoodName)
          setSelectedNeighborhood(neighborhoodData)
          setIsPopupOpen(true)
        },
      })
    }
  }

  const closeModal = () => {
    setIsPopupOpen(false)
    setSelectedNeighborhood(null)
  }

  const mapCenter = [-22.9068, -43.1729] as [number, number]

  useEffect(() => {
    getGeoData()
  }, [])

  if (isLoading) {
    return (
      <S.MapSkeletonContainer>
        <SkeletonComponent height="400px" width="600px" />
      </S.MapSkeletonContainer>
    )
  }

  return (
    <S.MapContent>
      <S.MapElement center={mapCenter} zoom={11}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geoData ? <GeoJSON data={geoData} onEachFeature={onEachFeature} /> : null}
      </S.MapElement>

      <NeighborhoodPopup
        selectedNeighborhood={selectedNeighborhood ?? null}
        isPopupOpen={isPopupOpen}
        closeModal={closeModal}
      />
    </S.MapContent>
  )
}
