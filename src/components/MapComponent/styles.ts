import { MapContainer } from 'react-leaflet'
import styled from 'styled-components'

export const MapContent = styled.div`
  margin-top: 6rem;
`

export const MapElement = styled(MapContainer)`
  height: 500px;
  width: 95%;
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 400px;
    width: 90%;
  }
`

export const MapSkeletonContainer = styled.div`
  margin: 0 auto;
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
