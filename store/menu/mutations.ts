import { mutationTree } from 'nuxt-typed-vuex'
import state from '~/store/menu/state'

export default mutationTree(state, {
  setAction(state, payload: { action: string; value: boolean }) {
    state.actions[payload.action] = payload.value
  },
})
