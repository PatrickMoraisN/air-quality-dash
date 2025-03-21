/* eslint-disable import/no-anonymous-default-export */
import ErrorMessages from '@constants/errorMessages'
import { geoData } from '@utils/geojson/geoData'

const getGeoDataJSON = async () => {
  try {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(geoData)
      }, 2000)
    })
  } catch (error) {
    console.error(ErrorMessages.FailedGeoJSONData, error)
    throw new Error(ErrorMessages.FailedGeoJSONData)
  }
}

export default {
  getGeoDataJSON,
}
