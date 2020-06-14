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
      Practice page
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  SetupContext,
} from '@vue/composition-api'

export default defineComponent({
  setup(_props, ctx: SetupContext) {
    setTimeout(() => {
      ctx.root.$accessor.menu.showPracticeActions()
    }, 100)
    onBeforeUnmount(() => {
      ctx.root.$accessor.menu.hidePracticeActions()
    })
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
</style>
