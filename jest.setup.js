import '@testing-library/jest-dom'

if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = obj => {
    if (obj === undefined) return undefined
    return JSON.parse(JSON.stringify(obj))
  }
}
