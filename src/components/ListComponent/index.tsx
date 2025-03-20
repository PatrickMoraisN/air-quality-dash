import { zodResolver } from '@hookform/resolvers/zod'
import airQualityAPI from '@services/airQuality'
import { searchSchema, SearchSchemaType } from '@validations/searchSchema'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as S from './styles'
import { NeighborhoodTable } from './sub-components/NeighborhoodTable'
import { PaginationComponent } from './sub-components/Pagination'
import { QualityFilter } from './sub-components/QualityFilter'

type QualityFiltersTypes = 'bom' | 'moderado' | 'ruim' | 'péssimo'

interface QualityHistoryProps {
  [key: string]: QualityFiltersTypes
}

interface SearchedNeighborhoodProps {
  name: string
  actual_quality: string
  history: QualityHistoryProps
}

interface OnPageChangeProps {
  page: number
  pageSize: number
}

interface FilterByQualityProps {
  qualityFilters: QualityFiltersTypes[]
  page?: number
}

export function ListComponent() {
  const [searchedNeighborhood, setSearchedNeighborhoods] = useState<
    SearchedNeighborhoodProps[] | null
  >(null)
  const [totalPages, setTotalPages] = useState<number>(0)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
  })
  const [qualityFilters, setQualityFilters] = useState<QualityFiltersTypes[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleSearch = async (data: { searchInput: string }) => {
    setIsLoading(true)
    const neighborhoods = await airQualityAPI.searchNeighborhoodByName(data.searchInput)
    setSearchedNeighborhoods(neighborhoods)
    setIsLoading(false)
  }

  const getFirstNeighborhoods = useCallback(async () => {
    const data = await airQualityAPI.getNeighborhoodPaginated(1)
    setSearchedNeighborhoods(data.data)
    setTotalPages(data.total)
    setIsLoading(false)
  }, [])

  const onPageChange = async ({ page }: OnPageChangeProps) => {
    if (!qualityFilters.length) {
      const data = await airQualityAPI.getNeighborhoodPaginated(page)
      setSearchedNeighborhoods(data.data)
      return
    }
    filterByQuality({ qualityFilters, page })
  }

  const clearSearchInput = () => {
    setValue('searchInput', '')
  }

  const handleQualityFilter = (quality: QualityFiltersTypes) => {
    clearSearchInput()

    setQualityFilters(prevFilters => {
      const isAlreadySelected = prevFilters.includes(quality)
      const isOnlyFilterSelected = prevFilters.length === 1 && isAlreadySelected

      if (isOnlyFilterSelected) {
        getFirstNeighborhoods()
        return []
      }

      if (isAlreadySelected) {
        const updatedFilters = prevFilters.filter(filter => filter !== quality)
        filterByQuality({ qualityFilters: updatedFilters })
        return updatedFilters
      }

      const updatedFilters = [...prevFilters, quality]
      filterByQuality({ qualityFilters: updatedFilters })
      return updatedFilters
    })
  }

  const filterByQuality = async ({ qualityFilters, page = 1 }: FilterByQualityProps) => {
    const neighborhoodsFiltered = await airQualityAPI.getNeighborhoodsFilteredPaginated(
      qualityFilters,
      page
    )
    setSearchedNeighborhoods(neighborhoodsFiltered.data)
    setTotalPages(neighborhoodsFiltered.total)
  }

  const showPagination = useCallback(() => {
    if (Boolean(searchedNeighborhood)) {
      return searchedNeighborhood!.length >= 10
    }
    return false
  }, [searchedNeighborhood])

  const showQualityFilters = useCallback(() => {
    return Boolean(searchedNeighborhood) && searchedNeighborhood!.length >= 1
  }, [searchedNeighborhood])

  useEffect(() => {
    getFirstNeighborhoods()
  }, [getFirstNeighborhoods])

  if (isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <S.SearchForm onSubmit={handleSubmit(handleSearch)}>
        <S.SearchInputContainer>
          <S.SearchInput
            type="text"
            placeholder="Buscar bairro. Ex: Copacabana"
            {...register('searchInput')}
          />
          {errors.searchInput && <S.ErrorText>{errors.searchInput.message}</S.ErrorText>}
        </S.SearchInputContainer>
        <S.SearchButton type="submit">Buscar</S.SearchButton>
      </S.SearchForm>
      {showQualityFilters() && (
        <QualityFilter handleQualityFilter={handleQualityFilter} qualityFilters={qualityFilters} />
      )}
      {searchedNeighborhood && <NeighborhoodTable neighborhoods={searchedNeighborhood} />}

      {showPagination() && (
        <PaginationComponent totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </>
  )
}
