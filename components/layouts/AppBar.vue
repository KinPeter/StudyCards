<template>
  <v-app-bar fixed app color="primary">
    <v-btn @click.stop="onBurgerClick" icon>
      <v-icon>{{ drawerOpen ? 'mdi-chevron-left' : 'mdi-menu' }}</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title" />
  </v-app-bar>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api'

interface Props {
  drawerOpen: boolean
}

export default defineComponent({
  props: {
    drawerOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, ctx: SetupContext) {
    const title = computed(() => {
      return 'StudyCards'
    })
    const onBurgerClick = () => {
      ctx.emit('burgerClick')
    }
    return {
      title,
      onBurgerClick,
    }
  },
})
</script>
