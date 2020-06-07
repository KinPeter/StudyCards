import { Context } from '@nuxt/types'
import ApiService from '~/services/api/ApiService'
import { AuthService } from '~/services/auth/AuthService'

export default (ctx: Context) => {
  const api = new ApiService(ctx.$axios)
  const auth = new AuthService(api)
  return {
    api,
    auth,
  }
}
