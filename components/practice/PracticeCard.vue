<template>
  <div @click="onClick" class="card">{{ word }} {{ correct }}</div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  props: {
    word: {
      type: String,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, ctx: SetupContext) {
    const onClick = () => {
      ctx.emit('cardClick', props.correct)
    }

    return {
      onClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
}
</style>
