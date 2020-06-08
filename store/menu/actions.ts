import { actionTree } from 'nuxt-typed-vuex'
import state from '~/store/menu/state'
import getters from '~/store/menu/getters'
import mutations from '~/store/menu/mutations'

export default actionTree(
  { state, getters, mutations },
  {
    showPracticeActions({ commit }) {
      commit('setAction', { action: 'save', value: true })
    },
    hidePracticeActions({ commit }) {
      commit('setAction', { action: 'save', value: false })
    },
  }
)
