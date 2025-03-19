import { zodResolver } from '@hookform/resolvers/zod'
import airQualityAPI from '@services/airQualityService'
import { searchSchema, SearchSchemaType } from '@validations/searchSchema'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as S from './styles'
import { NeighborhoodTable } from './sub-components/NeighborhoodTable'
import { PaginationComponent } from './sub-components/Pagination'
import { QualityFilter } from './sub-components/QualityFilter'

interface searchedNeighborhoodProps {
  name: string
  actual_quality: string
}

interface onPageChangeProps {
  page: number
  pageSize: number
}

type QualityFiltersTypes = 'bom' | 'moderado' | 'ruim' | 'péssimo'

export function ListComponent() {
  const [searchedNeighborhood, setSearchedNeighborhoods] = useState<
    searchedNeighborhoodProps[] | null
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
    const neighborhoods = await airQualityAPI.searchBairroByName(data.searchInput)
    setSearchedNeighborhoods(neighborhoods)
  }

  const getFirstNeighborhoods = async () => {
    const data = await airQualityAPI.getBairrosPaginated(1)
    setSearchedNeighborhoods(data.data)
    setTotalPages(data.total)
    setIsLoading(false)
  }

  const onPageChange = async ({ page }: onPageChangeProps) => {
    if (!qualityFilters.length) {
      const data = await airQualityAPI.getBairrosPaginated(page)
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
    let qualityFiltersArray = [...qualityFilters]
    if (qualityFilters.length === 1 && qualityFilters[0] === quality) {
      setQualityFilters([])
      getFirstNeighborhoods()
      return
    }
    if (qualityFilters.includes(quality)) {
      const qualifyFiltered = qualityFilters.filter(filter => filter !== quality)
      setQualityFilters(qualifyFiltered)
      qualityFiltersArray = qualifyFiltered
    } else {
      const qualifyFiltered = [...qualityFilters, quality]
      setQualityFilters(qualifyFiltered)
      qualityFiltersArray = qualifyFiltered
    }
    filterByQuality({ qualityFilters: qualityFiltersArray })
  }

  const filterByQuality = async ({ qualityFilters, page = 1 }: QualityFiltersTypes[]) => {
    const neighborhoodsFiltered = await airQualityAPI.getNeighborhoodsFilteredPaginated(
      qualityFilters,
      page
    )
    setSearchedNeighborhoods(neighborhoodsFiltered.data)
    setTotalPages(neighborhoodsFiltered.total)
  }

  const showPagination = useCallback(() => {
    console.log('bizarro' + Boolean(searchedNeighborhood))
    if (Boolean(searchedNeighborhood)) {
      return searchedNeighborhood.length >= 10
    }
    return false
  }, [searchedNeighborhood])

  useEffect(() => {
    getFirstNeighborhoods()
  }, [])

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
      <QualityFilter handleQualityFilter={handleQualityFilter} qualityFilters={qualityFilters} />
      {searchedNeighborhood && <NeighborhoodTable neighborhoods={searchedNeighborhood} />}

      <PaginationComponent
        totalPages={totalPages}
        onPageChange={onPageChange}
        showPagination={showPagination}
      />
    </>
  )
}
