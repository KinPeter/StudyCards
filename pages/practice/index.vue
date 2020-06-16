<template>
  <div class="practice">
    <div
      v-if="!$accessor.decks.hasLoadedDeckAndWordList"
      class="practice__not-loaded"
    >
      <v-icon>mdi-emoticon-sad-outline</v-icon>
      <p>No loaded deck.</p>
      <v-btn text color="secondary" nuxt to="/decks">Go to My Decks!</v-btn>
    </div>
    <div v-else class="practice-wrapper">
      {{ words.front[progress.remaining[0]] }}
      <PracticeCards :current="currentIndex" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  SetupContext,
} from '@vue/composition-api'
import PracticeCards from '~/components/practice/PracticeCards.vue'

export default defineComponent({
  components: {
    PracticeCards,
  },

  setup(_props, ctx: SetupContext) {
    const words = ctx.root.$accessor.decks.loadedDeck.wordList
    const progress = computed(
      () => ctx.root.$accessor.decks.loadedDeck.progress
    )
    const currentIndex = computed(
      () => ctx.root.$accessor.decks.loadedDeck.progress.remaining[0]
    )

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
    }
  },

  head: {
    title: 'Practice',
  },
})
</script>

<style lang="scss" scoped>
.practice__not-loaded {
  text-align: center;
  margin-top: 10vh;

  .v-icon {
    margin-bottom: 1rem;
  }
}

.practice-wrapper {
  max-width: 700px;
  margin: 0 auto;
}
</style>
