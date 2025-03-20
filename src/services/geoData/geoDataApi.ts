/* eslint-disable import/no-anonymous-default-export */
import { geoData } from '@utils/geojson/geoData'

const getGeoDataJSON = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(geoData)
    }, 2000)
  })
}

export default {
  getGeoDataJSON,
}
