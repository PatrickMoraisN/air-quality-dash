import { toTitleCase } from '../stringsUtils'

describe('toTitleCase Function', () => {
  it('capitalizes the first letter of each word', () => {
    expect(toTitleCase('cidade universitária')).toBe('Cidade Universitária')
  })

  it('keeps lowercases when not the first word', () => {
    expect(toTitleCase('praia do flamengo')).toBe('Praia do Flamengo')
    expect(toTitleCase('bairro da luz')).toBe('Bairro da Luz')
    expect(toTitleCase('centro de tecnologia')).toBe('Centro de Tecnologia')
    expect(toTitleCase('conjunto dos bancários')).toBe('Conjunto dos Bancários')
  })

  it('capitalizes "do", "da", "de", "dos", "das" when they are the first word', () => {
    expect(toTitleCase('dois irmãos')).toBe('Dois Irmãos')
    expect(toTitleCase('das flores')).toBe('Das Flores')
  })

  it('handle single-word inputs', () => {
    expect(toTitleCase('rio')).toBe('Rio')
    expect(toTitleCase('mar')).toBe('Mar')
  })

  it('handle already capitalized words correctly', () => {
    expect(toTitleCase('Floresta Amazônica')).toBe('Floresta Amazônica')
    expect(toTitleCase('Avenida Paulista')).toBe('Avenida Paulista')
  })

  it('trim extra spaces and handle multiple spaces between words', () => {
    expect(toTitleCase('  avenida paulista  ')).toBe('Avenida Paulista')
    expect(toTitleCase('  bairro da paz ')).toBe('Bairro da Paz')
  })

  it('returns an empty string if input is empty', () => {
    expect(toTitleCase('')).toBe('')
  })

  it('handle strings with special characters correctly', () => {
    expect(toTitleCase('cidade universitária - zona oeste')).toBe(
      'Cidade Universitária - Zona Oeste'
    )
    expect(toTitleCase('parque dos príncipes')).toBe('Parque dos Príncipes')
  })

  it('handle mixed casing input', () => {
    expect(toTitleCase('cIdAdE UnIvErSiTáRiA')).toBe('Cidade Universitária')
    expect(toTitleCase('AVENIDA PAULISTA')).toBe('Avenida Paulista')
  })
})
