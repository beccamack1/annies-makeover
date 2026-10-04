// Makes "Crème Brûlée" match "creme brulee"
export function simplify(text: string) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

export function matches(text: string, query: string) {
  const words = simplify(query).split(/\s+/).filter(Boolean)
  const haystack = simplify(text)
  return words.every((word) => haystack.includes(word))
}
