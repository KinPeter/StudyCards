import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex'
import { DeckProgress } from '~/services/deck/types/DeckProgress'
import { WordList } from '~/services/deck/types/WordList'
import { DeckResource } from '~/services/deck/types/DeckResource'
import { parseProgress } from '~/utils/parseProgress'
import { DeckService } from '~/services/deck/DeckService'

export const namespaced = true

interface DecksState {
  loadedDeck: {
    id: string
    name: string
    link: string
    progress: DeckProgress
    wordList: WordList
  }
}

const state = (): DecksState => ({
  loadedDeck: {
    id: '',
    name: '',
    link: '',
    progress: {
      remaining: [],
      done: [],
      difficult: [],
      lastUsed: '',
      shuffled: false,
    },
    wordList: {
      front: [],
      back: [],
    },
  },
})

const getters = getterTree(state, {
  hasLoadedDeck(state): boolean {
    return state.loadedDeck.id !== ''
  },
  hasLoadedDeckAndWordList(state): boolean {
    return (
      state.loadedDeck.id !== '' && state.loadedDeck.wordList.front.length !== 0
    )
  },
  numberOfCards(state): number {
    return (
      state.loadedDeck.progress.remaining.length +
      state.loadedDeck.progress.done.length +
      state.loadedDeck.progress.difficult.length
    )
  },
})

const mutations = mutationTree(state, {
  loadDeckData(state, deck: DeckResource) {
    state.loadedDeck.id = deck.id
    state.loadedDeck.name = deck.name
    state.loadedDeck.link = deck.link
    state.loadedDeck.progress = parseProgress(deck.progress)
  },
  loadWordList(state, wordList: WordList) {
    state.loadedDeck.wordList = wordList
  },
  transferCard(
    state,
    payload: { fromDifficult: boolean; toDifficult: boolean }
  ) {
    let elem: number | undefined
    if (!payload.fromDifficult) {
      elem = state.loadedDeck.progress.remaining.shift()
    } else {
      elem = state.loadedDeck.progress.difficult.shift()
    }
    if (elem && !payload.toDifficult) {
      state.loadedDeck.progress.done.push(elem)
    } else if (elem && payload.toDifficult) {
      state.loadedDeck.progress.difficult.push(elem)
    }
  },
})

const actions = actionTree(
  { state, getters, mutations },
  {
    loadForEdit({ commit }, deck: DeckResource) {
      commit('loadDeckData', deck)
    },
    async loadForPractice(
      { commit },
      payload: { deck: DeckResource; deckService: DeckService }
    ) {
      const { deck, deckService } = payload
      commit('loadDeckData', deck)
      const wordList = await deckService.getWordList(deck.link)
      commit('loadWordList', wordList)
    },
    practiceCorrectAnswer({ commit }) {
      commit('transferCard', { fromDifficult: false, toDifficult: false })
    },
    practiceIncorrectAnswer({ commit }) {
      commit('transferCard', { fromDifficult: false, toDifficult: true })
    },
  }
)

export { state, getters, mutations, actions }
