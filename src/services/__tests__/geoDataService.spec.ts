import { geoData } from '@utils/geojson/geoData'
import geoDataService from '../geoDataService'

jest.useFakeTimers()

describe('geoDataService', () => {
  it('returns the correct geoData after 2 seconds', async () => {
    const promise = geoDataService.getGeoDataJSON()

    jest.advanceTimersByTime(2000)

    await expect(promise).resolves.toEqual(geoData)
  })
})
