import { toaster } from '@components/ui/toaster'
import { handleAsync } from '@utils/handleAsync'

jest.mock('@components/ui/toaster', () => ({
  toaster: {
    create: jest.fn(),
  },
}))

describe('handleAsync', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns value when function resolves', async () => {
    const fn = jest.fn().mockResolvedValue('sucesso')

    const result = await handleAsync(fn)

    expect(result).toBe('sucesso')
    expect(fn).toHaveBeenCalled()
    expect(toaster.create).not.toHaveBeenCalled()
  })

  it('shows toast error message when functions rejects', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('Erro de teste'))

    const result = await handleAsync(fn)

    expect(result).toBeNull()
    expect(fn).toHaveBeenCalled()
    expect(toaster.create).toHaveBeenCalledWith({
      title: 'Erro de teste',
      type: 'error',
    })
  })

  it('shows toast with fallbacMessage when error is not instance of Error', async () => {
    const fn = jest.fn().mockRejectedValue('erro qualquer')

    const result = await handleAsync(fn, 'Mensagem alternativa')

    expect(result).toBeNull()
    expect(fn).toHaveBeenCalled()
    expect(toaster.create).toHaveBeenCalledWith({
      title: 'Mensagem alternativa',
      type: 'error',
    })
  })
})
