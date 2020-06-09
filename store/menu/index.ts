import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'

export const namespaced = true

interface MenuState {
  actions: { [key: string]: boolean }
}

const state = (): MenuState => ({
  actions: {
    save: false,
  },
})

const getters = getterTree(state, {
  practiceActions(state, _getters, _rootState): boolean {
    return Object.values(state.actions).some(value => !!value)
  },
})

const mutations = mutationTree(state, {
  setAction(state, payload: { action: string; value: boolean }) {
    state.actions[payload.action] = payload.value
  },
})

const actions = actionTree(
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

export { state, getters, mutations, actions }
