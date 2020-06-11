import ApiService from '~/services/api/ApiService'
import { WordList } from '~/services/deck/types/WordList'

export class DeckService {
  constructor(private api: ApiService) {}

  wordList: WordList = { front: [], back: [] }

  async fetch(url: string): Promise<string> {
    const resp = await fetch(url)
    return await resp.text()
  }

  async verify(url: string): Promise<number> {
    const file = await this.fetch(url)
    const lines = file.split('\n')
    try {
      lines.forEach(line => {
        const wordPair = line.split('\t')
        this.wordList.front.push(wordPair[0])
        this.wordList.back.push(wordPair[1])
      })
      if (this.wordList.front.length !== this.wordList.back.length) {
        return -1
      }
    } catch (_e) {
      return -1
    }
    // eslint-disable-next-line no-console
    console.log('wordList', this.wordList)
    return lines.length
  }

  register(username: string, password: string): Promise<any> {
    return this.api.post<any, any>('/auth/register', {
      username,
      password,
    })
  }
}
