<template>
  <v-expansion-panel class="deck-panel">
    <v-expansion-panel-header>{{ deck.name }}</v-expansion-panel-header>
    <v-expansion-panel-content>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  Ref,
  SetupContext,
} from '@vue/composition-api'
import { DeckResource } from '~/services/deck/types/DeckResource'
import { DeckProgress } from '~/services/deck/types/DeckProgress'
import { parseProgress } from '~/utils/parseProgress'

export default defineComponent({
  props: {
    deck: {
      type: Object as PropType<DeckResource>,
      required: true,
    },
  },

  setup(props, _ctx: SetupContext) {
    const progress: Ref<DeckProgress> = ref(parseProgress(props.deck.progress))

    return {
      progress,
    }
  },
})
</script>
