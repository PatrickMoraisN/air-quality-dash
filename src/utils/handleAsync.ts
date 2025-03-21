import { toaster } from '@components/ui/toaster'
import ErrorMessages from '@constants/errorMessages'

type ToasterProps = {
  message: string
}

const createToaster = ({ message }: ToasterProps) => {
  return toaster.create({
    title: message,
    type: 'error',
  })
}

export const handleAsync = async <T>(
  fn: () => Promise<T>,
  fallbackMessage: string = ErrorMessages.GeneralError
): Promise<T | null> => {
  try {
    return await fn()
  } catch (error) {
    if (error instanceof Error) {
      createToaster({ message: error.message })
    } else {
      createToaster({ message: fallbackMessage })
    }
    return null
  }
}
