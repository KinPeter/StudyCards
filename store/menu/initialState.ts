import { MenuState } from '~/store/menu/types/MenuState'

export function initialState(): MenuState {
  return {
    routes: {
      decks: false,
    },
    actions: {
      logOut: false,
      save: false,
    },
  }
}
