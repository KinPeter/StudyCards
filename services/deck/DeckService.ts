import ApiService from '~/services/api/ApiService'
import { Card } from '~/services/deck/types/Card'

export class DeckService {
  constructor(private api: ApiService) {}

  async fetch(url: string): Promise<Card[]> {
    const resp = await fetch(url)
    const file = await resp.text()
    // eslint-disable-next-line no-console
    console.log(file)
    return []
  }

  register(username: string, password: string): Promise<any> {
    return this.api.post<any, any>('/auth/register', {
      username,
      password,
    })
  }
}
