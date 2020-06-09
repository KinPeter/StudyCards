<template>
  <div class="add-new-deck">
    <DeckEditor :new-deck="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import DeckEditor from '~/components/decks/DeckEditor.vue'

export default defineComponent({
  components: {
    DeckEditor,
  },

  setup(_props, _ctx: SetupContext) {},

  head: {
    title: 'New Deck',
  },
})
</script>

<style lang="scss" scoped>
.add-new-deck {
  width: 100%;
}
</style>
