<template>
  <div class="practice">
    Decks page
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
      ctx.root.$accessor.menu.showDecksActions()
    }, 100)
    onBeforeUnmount(() => {
      ctx.root.$accessor.menu.hideDecksActions()
    })
  },

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
