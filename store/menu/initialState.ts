import { MenuState } from '~/store/menu/types/MenuState'

export function initialState(): MenuState {
  return {
    actions: {
      save: false,
    },
  }
}
