export function getRandomNumbersArray(length: number, max: number): number[] {
  const array: number[] = []
  while (array.length < length) {
    const r = Math.floor(Math.random() * max)
    if (!array.includes(r)) {
      array.push(r)
    }
  }
  return array
}
