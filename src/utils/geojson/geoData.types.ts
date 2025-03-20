/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BairroProperties {
  Name: string | null
  description: string | null
  OBJECTID: number
  Área: number
  NOME: string
  REGIAO_ADM: string
  AREA_PLANE: string
  CODBAIRRO: string
  CODRA: number
  CODBNUM: number
  LINK: string
  SHAPESTArea: number
  SHAPESTLength: number
  RP: string
  Cod_RP: string
  CODBAIRRO_LONG: number
  [key: string]: any
}

export interface PolygonGeometry {
  type: 'Polygon'
  coordinates: number[][][]
}

export interface BairroFeature {
  type: 'Feature'
  properties: BairroProperties
  geometry: PolygonGeometry
}

export interface GeoJSONData {
  type: 'FeatureCollection'
  crs: {
    type: string
    properties: {
      name: string
    }
  }
  features: BairroFeature[]
}
