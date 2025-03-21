'use client'

import { Toaster as ChakraToaster, Portal, Stack, Toast, createToaster } from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top-end',
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {toast => (
          <Toast.Root width={{ md: 'md' }} padding={{ base: '4', md: '6' }}>
            <Toast.Indicator />
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title fontSize={16}>{toast.title}</Toast.Title>}
            </Stack>
            {toast.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
