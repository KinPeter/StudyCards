<template>
  <div class="add-new-deck">
    Add new deck page
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
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
