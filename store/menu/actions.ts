import { actionTree } from 'nuxt-typed-vuex'
import state from '~/store/menu/state'
import getters from '~/store/menu/getters'
import mutations from '~/store/menu/mutations'

export default actionTree(
  { state, getters, mutations },
  {
    showLogOut({ commit }) {
      commit('setAction', { action: 'logOut', value: true })
    },
    hideLogOut({ commit }) {
      commit('setAction', { action: 'logOut', value: false })
    },
  }
)
