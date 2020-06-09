<template>
  <div class="practice">
    Practice page
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
.practice {
  width: 100%;
}
</style>
