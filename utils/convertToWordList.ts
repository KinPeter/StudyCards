import { WordList } from '~/services/deck/types/WordList'

export function convertToWordList(text: string): WordList {
  const wordList: WordList = { front: [], back: [] }
  const lines = text.split('\n')
  if (lines.length === 0) {
    throw new Error('Empty or corrupted file!')
  }
  lines.forEach(line => {
    const wordPair = line.split('\t')
    wordList.front.push(wordPair[0])
    wordList.back.push(wordPair[1])
  })
  return wordList
}
