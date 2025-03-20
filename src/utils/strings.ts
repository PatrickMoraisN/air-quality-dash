export const toTitleCase = (str: string): string => {
  const lowercaseWords = new Set(['do', 'da', 'de', 'dos', 'das'])

  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) =>
      lowercaseWords.has(word) && index !== 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ')
    .trim()
}

export const normalizeSearchTerm = (term: string): string => {
  return toTitleCase(term.trim())
}
