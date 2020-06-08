import { getterTree } from 'nuxt-typed-vuex'
import state from '~/store/menu/state'

export default getterTree(state, {
  practiceActions(state, _getters, _rootState): boolean {
    return Object.values(state.actions).some(value => !!value)
  },
})
