import { getterTree } from 'nuxt-typed-vuex'
import state from '~/store/menu/state'

export default getterTree(state(), {})
