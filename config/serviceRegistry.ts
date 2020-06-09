import { Context } from '@nuxt/types'
import ApiService from '~/services/api/ApiService'
import { AuthService } from '~/services/auth/AuthService'
import { DeckService } from '~/services/deck/DeckService'

export default (ctx: Context) => {
  const api = new ApiService(ctx.$axios)
  const auth = new AuthService(api)
  const deck = new DeckService(api)
  return {
    api,
    auth,
    deck,
  }
}
