import { MapContainer } from 'react-leaflet'
import styled from 'styled-components'

export const MapContent = styled.div`
  margin-top: 6rem;
`

export const MapElement = styled(MapContainer)`
  height: 500px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
`
