declare module 'react-leaflet' {
  import { MapContainerProps } from 'react-leaflet'

  export interface CustomMapContainerProps extends MapContainerProps {
    center: [number, number]
  }
}
