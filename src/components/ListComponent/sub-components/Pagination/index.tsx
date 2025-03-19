'use client'

import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import * as S from './styles'

interface onPageChangeProps {
  page: number
  pageSize: number
}

interface PaginationComponentProps {
  totalPages: number
  page?: number
  onPageChange: (page: onPageChangeProps) => void
  showPagination: () => boolean
}

export const PaginationComponent = ({
  totalPages,
  page = 1,
  onPageChange,
  showPagination,
}: PaginationComponentProps) => {
  const shouldShowPagination = showPagination()
  console.log('shouldShowPagination', shouldShowPagination)

  if (!shouldShowPagination) {
    return null
  }

  return (
    <S.PaginationComponent>
      <Pagination.Root
        count={totalPages}
        pageSize={2}
        defaultPage={page}
        onPageChange={onPageChange}
      >
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton
              variant="outline"
              borderRadius="md"
              borderColor="gray.500"
              color="gray.600"
              bg="transparent"
              _hover={{
                bg: 'gray.100',
                color: 'gray.800',
                _dark: { bg: 'gray.700', color: 'gray.300' },
              }}
              _active={{
                bg: 'gray.600',
                color: 'white',
                _dark: { bg: 'gray.300', color: 'black' },
              }}
            >
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.Items
            render={page => (
              <IconButton
                borderRadius="md"
                variant="outline"
                borderColor="gray.500"
                color="gray.600"
                bg="transparent"
                _hover={{
                  bg: 'gray.100',
                  color: 'gray.800',
                  _dark: { bg: 'gray.700', color: 'gray.300' },
                }}
                _active={{
                  bg: 'gray.600',
                  color: 'white',
                  _dark: { bg: 'gray.300', color: 'black' },
                }}
                _selected={{
                  bg: 'gray.600',
                  color: 'white',
                  _dark: { bg: 'gray.300', color: 'black' },
                }}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton
              variant="outline"
              borderRadius="md"
              borderColor="gray.500"
              color="gray.600"
              bg="transparent"
              _hover={{
                bg: 'gray.100',
                color: 'gray.800',
                _dark: { bg: 'gray.700', color: 'gray.300' },
              }}
              _active={{
                bg: 'gray.600',
                color: 'white',
                _dark: { bg: 'gray.300', color: 'black' },
              }}
            >
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </S.PaginationComponent>
  )
}
