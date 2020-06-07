<template>
  <v-app dark>
    <NavigationDrawer :open.sync="drawer" :items="items" />
    <AppBar :drawer-open="drawer" @burgerClick="toggleDrawer" />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import NavigationDrawer from '~/components/layouts/NavigationDrawer.vue'
import AppBar from '~/components/layouts/AppBar.vue'

export default Vue.extend({
  components: {
    NavigationDrawer,
    AppBar,
  },
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
  },
})
</script>
