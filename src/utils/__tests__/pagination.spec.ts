import { createSortedUrl, paginateArray } from '../pagination'

describe('pagination', () => {
  describe('paginateArray', () => {
    it('returns a paginated array', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const page = 1
      const limit = 5

      const result = paginateArray({ array, page, limit })

      expect(result).toEqual([1, 2, 3, 4, 5])
    })

    it('returns a paginated array for the second page', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const page = 2
      const limit = 5

      const result = paginateArray({ array, page, limit })

      expect(result).toEqual([6, 7, 8, 9, 10])
    })
  })

  describe('createSortedUrl', () => {
    it('returns a sorted url', () => {
      const baseUrl = 'http://example.com'

      const result = createSortedUrl(baseUrl)

      expect(result).toEqual('http://example.com?_sort=id&_order=asc')
    })
  })
})
