<template>
  <div class="practice">
    <div
      v-if="!$accessor.decks.hasLoadedDeckAndWordList"
      class="practice__warning"
    >
      <v-icon>mdi-emoticon-sad-outline</v-icon>
      <p>No loaded deck.</p>
      <v-btn text color="secondary" nuxt to="/decks">Go to My Decks!</v-btn>
    </div>

    <div v-if="showNoMoreCards" class="practice__warning">
      <v-icon color="success">mdi-check-all</v-icon>
      <p>No more cards here!</p>
      <v-btn
        v-if="
          !$accessor.decks.loadedDeck.progress.difficult.length &&
          $accessor.decks.loadedDeck.progress.remaining.length
        "
        @click="onBackToRemaining"
        text
        color="secondary"
      >
        Back to remaining!
      </v-btn>
      <v-btn
        v-if="
          $accessor.decks.loadedDeck.progress.difficult.length &&
          !$accessor.decks.loadedDeck.progress.remaining.length
        "
        @click="onShowDifficult"
        text
        color="secondary"
      >
        Check the difficult words!
      </v-btn>
      <v-btn
        v-if="
          !$accessor.decks.loadedDeck.progress.difficult.length &&
          !$accessor.decks.loadedDeck.progress.remaining.length
        "
        text
        color="secondary"
        nuxt
        to="/decks"
      >
        Go to My Decks!
      </v-btn>
    </div>

    <div v-else class="practice-wrapper">
      {{ currentWord }}
      <PracticeCards :current="currentIndex" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  Ref,
  SetupContext,
} from '@vue/composition-api'
import PracticeCards from '~/components/practice/PracticeCards.vue'

export default defineComponent({
  components: {
    PracticeCards,
  },

  setup(_props, ctx: SetupContext) {
    const words = ctx.root.$accessor.decks.loadedDeck.wordList
    const showNoMoreCards: Ref<boolean> = ref(false)
    const progress = computed(
      () => ctx.root.$accessor.decks.loadedDeck.progress
    )
    const currentIndex = computed(() => {
      const index = ctx.root.$accessor.decks.isShowingDifficult
        ? progress.value.difficult[0]
        : progress.value.remaining[0]
      showNoMoreCards.value = index === undefined
      return index
    })

    const currentWord = computed(() => {
      return ctx.root.$accessor.decks.isShowingDifficult
        ? words.front[progress.value.difficult[0]]
        : words.front[progress.value.remaining[0]]
    })

    const onBackToRemaining = () => {
      showNoMoreCards.value = false
      ctx.root.$accessor.decks.showRemaining()
    }

    const onShowDifficult = () => {
      showNoMoreCards.value = false
      ctx.root.$accessor.decks.showDifficult()
    }

    setTimeout(() => {
      ctx.root.$accessor.menu.showPracticeActions()
    }, 100)
    onBeforeUnmount(() => {
      ctx.root.$accessor.menu.hidePracticeActions()
    })

    return {
      words,
      progress,
      currentIndex,
      currentWord,
      showNoMoreCards,
      onBackToRemaining,
      onShowDifficult,
    }
  },

  head: {
    title: 'Practice',
  },
})
</script>

<style lang="scss" scoped>
.practice__warning {
  text-align: center;
  margin-top: 10vh;

  .v-icon {
    margin-bottom: 1rem;
  }
}

.practice-wrapper {
  max-width: 700px;
  height: 100%;
  margin: 0 auto;
}
</style>
