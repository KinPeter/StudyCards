import {
  actionTree,
  getAccessorType,
  getterTree,
  mutationTree,
} from 'nuxt-typed-vuex'
import * as menu from '~/store/menu'

export const state = () => ({})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {})

export const actions = actionTree({ state, getters, mutations }, {})

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    menu,
    // Add your submodules here
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
  },
})
