<template>
  <v-app-bar fixed app color="primary">
    <v-btn @click.stop="onBurgerClick" icon>
      <v-icon>{{ drawerOpen ? 'mdi-chevron-left' : 'mdi-menu' }}</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title" />
  </v-app-bar>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  Ref,
  SetupContext,
  watch,
} from '@vue/composition-api'

export default defineComponent({
  props: {
    drawerOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, ctx: SetupContext) {
    const routeText: Ref<string> = ref('')

    const title = computed(() => {
      return routeText.value + ' - StudyCards'
    })

    watch(
      () => ctx.root.$route,
      () => {
        switch (ctx.root.$route.path) {
          case '/login':
            routeText.value = 'Login'
            break
          case '/decks':
            routeText.value = 'My Decks'
            break
          case '/decks/add':
            routeText.value = 'New Deck'
            break
          case '/decks/edit':
            routeText.value = 'Edit Deck'
            break
          case '/practice':
            routeText.value = 'Practice'
            break
          default:
            routeText.value = 'N/A'
        }
      }
    )

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
