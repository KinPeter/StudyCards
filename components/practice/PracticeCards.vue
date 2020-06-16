<template>
  <div class="practice-cards">
    <PracticeCard
      v-for="(card, index) in cards"
      :key="index"
      :word="card.word"
      :correct="card.correct"
      @cardClick="onClick"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  Ref,
  SetupContext,
} from '@vue/composition-api'
import PracticeCard from '~/components/practice/PracticeCard.vue'
import { Card } from '~/components/practice/Card'
import { getRandomNumbersArray } from '~/utils/getRandomNumbersArray'
import { shuffleArray } from '~/utils/shuffleArray'

export default defineComponent({
  components: {
    PracticeCard,
  },

  props: {
    current: {
      type: Number,
      required: true,
    },
  },

  setup(props, ctx: SetupContext) {
    const cards: Readonly<Ref<readonly Card[]>> = computed(() => {
      const words = ctx.root.$accessor.decks.loadedDeck.wordList.back
      const allAnswers = shuffleArray(
        getRandomNumbersArray(4, words.length, props.current)
      )
      return allAnswers.map(index => {
        return {
          word: words[index],
          correct: index === props.current,
        }
      })
    })

    const onClick = (isCorrect: boolean) => {
      if (isCorrect) {
        ctx.root.$accessor.decks.practiceCorrectAnswer()
      } else {
        ctx.root.$accessor.decks.practiceIncorrectAnswer()
      }
    }

    return {
      cards,
      onClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.practice-cards {
  width: 100%;
}
</style>
