import { Skeleton } from '@chakra-ui/react'

interface SkeletonProps {
  height?: string
  width?: string
}

export const SkeletonComponent = ({ height = '400px', width = '400px' }: SkeletonProps) => {
  return <Skeleton data-testid="skeleton" height={height} width={width} />
}
