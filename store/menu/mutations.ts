import { mutationTree } from 'nuxt-typed-vuex'
import state from '~/store/menu/state'

export default mutationTree(state, {
  setRoute(state, payload: { route: string; value: boolean }) {
    state.routes[payload.route] = payload.value
  },
  setAction(state, payload: { action: string; value: boolean }) {
    state.actions[payload.action] = payload.value
  },
})
