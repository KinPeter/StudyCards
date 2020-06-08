<template>
  <div class="practice">
    Decks page
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  setup(_props, _ctx: SetupContext) {},

  head: {
    title: 'My Decks',
  },
})
</script>

<style lang="scss" scoped>
.practice {
  width: 100%;
}
</style>
