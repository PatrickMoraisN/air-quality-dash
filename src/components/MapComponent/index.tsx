'use client'
import { BairroFeature } from '@types/geoData.types'
import { geoData } from '@utils/geojson/geoData'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import type { Layer } from 'react-leaflet'
import { GeoJSON, TileLayer } from 'react-leaflet'
import airQualityService from '../../services/airQualityService'
import { NeighborhoodPopup } from '../NeighborhoodPopup'
import * as S from './styles'

export const MapComponent = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)

  const getNeighborhoodInfo = async (selectedNeighborhood: string) => {
    const response = await airQualityService.searchBairroByName(selectedNeighborhood)
    return response[0]
  }

  const onEachFeature = async (feature: BairroFeature, layer: Layer) => {
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

  return (
    <S.MapContent>
      <S.MapElement center={mapCenter} zoom={11} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON data={geoData} onEachFeature={onEachFeature} />
      </S.MapElement>

      <NeighborhoodPopup
        selectedNeighborhood={selectedNeighborhood ?? ''}
        isPopupOpen={isPopupOpen}
        closeModal={closeModal}
      />
    </S.MapContent>
  )
}
