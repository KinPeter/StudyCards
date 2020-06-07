<template>
  <v-app dark>
    <NavigationDrawer :open.sync="drawer" :routes="routes" :actions="actions" />
    <AppBar :drawer-open="drawer" @burgerClick="toggleDrawer" />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, SetupContext } from '@vue/composition-api'
import NavigationDrawer from '~/components/layouts/NavigationDrawer.vue'
import AppBar from '~/components/layouts/AppBar.vue'

export default defineComponent({
  components: {
    NavigationDrawer,
    AppBar,
  },
  setup(_props, ctx: SetupContext) {
    const drawer: Ref<boolean> = ref(false)

    const toggleDrawer = (): void => {
      drawer.value = !drawer.value
    }

    const initRoutes = [
      {
        icon: 'mdi-chart-bubble',
        title: 'Inspire',
        to: '/inspire',
      },
    ]
    const initActions = [
      {
        icon: 'mdi-theme-light-dark',
        title: 'Theme',
        action: () => {
          ctx.root.$vuetify.theme.dark = !ctx.root.$vuetify.theme.dark
        },
      },
      {
        icon: 'mdi-logout-variant',
        title: 'Log out',
        action: () => {
          ctx.root.$auth.logout()
        },
      },
    ]

    const routes: Ref<[]> = ref(initRoutes)
    const actions: Ref<[]> = ref(initActions)

    return {
      drawer,
      toggleDrawer,
      routes,
      actions,
    }
  },
})
</script>
