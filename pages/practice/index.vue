<template>
  <div class="practice">
    Practice page
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  SetupContext,
} from '@vue/composition-api'

export default defineComponent({
  setup(_props, ctx: SetupContext) {
    onMounted(() => {
      ctx.root.$store.dispatch('menu/showPracticeActions')
      // ctx.root.$accessor.menu.showPracticeActions() // FIXME
    })
    onBeforeUnmount(() => {
      ctx.root.$store.dispatch('menu/hidePracticeActions')
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
