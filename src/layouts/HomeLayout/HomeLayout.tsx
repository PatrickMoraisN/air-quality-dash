'use client'
import { Dialog } from '@chakra-ui/react'
import { Header } from '@components/Header'
import { ListComponent } from '@components/ListComponent'
import { MapComponent } from '@components/MapComponent'
import { Toaster } from '@components/ui/toaster'
import { ViewToggle } from '@components/ViewToggle'

import { JSX, useState } from 'react'
import * as S from './HomeLayout.style'

type ViewModeProps = 'map' | 'list'

export function HomeLayout() {
  const [viewMode, setViewMode] = useState<ViewModeProps>('map')

  const viewModeRenderMap: Record<ViewModeProps, JSX.Element> = {
    map: <MapComponent />,
    list: <ListComponent />,
  }

  return (
    <Dialog.Root>
      <S.HomeLayoutContainer>
        <Toaster />
        <Header />
        <S.PrincipalText>Selecione o bairro para saber a qualidade do ar!</S.PrincipalText>
        <ViewToggle setViewMode={setViewMode} viewMode={viewMode} />
        {viewModeRenderMap[viewMode]}
      </S.HomeLayoutContainer>
    </Dialog.Root>
  )
}
