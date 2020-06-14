import { getRandomNumbersArray } from '~/utils/getRandomNumbersArray'

describe('getRandomNumbersArray', () => {
  it('should generate proper arrays', () => {
    const array = getRandomNumbersArray(4, 4)
    expect(array.length).toEqual(4)
    expect(array.length).toEqual(new Set(array).size)
    expect(array.every(num => num <= 3 && num >= 0))

    const array2 = getRandomNumbersArray(4, 500)
    expect(array2.length).toEqual(4)
    expect(array2.length).toEqual(new Set(array2).size)
    expect(array2.every(num => num <= 499 && num >= 0))
  })
})
