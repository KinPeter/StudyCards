<template>
  <v-navigation-drawer :value="open" @input="onChange" fixed app>
    <v-list>
      <v-list-item v-if="routes[0].show" :to="routes[0].to" router exact>
        <v-list-item-action>
          <v-icon>{{ routes[0].icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="routes[0].title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-if="actions[0].show" @click="actions[0].action">
        <v-list-item-action>
          <v-icon>{{ actions[0].icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="actions[0].title" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="actions[1].show" @click="actions[1].action">
        <v-list-item-action>
          <v-icon>{{ actions[1].icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="actions[1].title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  Ref,
  SetupContext,
} from '@vue/composition-api'

interface Props {
  open: boolean
}

export default defineComponent({
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props: Props, ctx: SetupContext) {
    const routes: Ref<[]> = ref([
      {
        icon: 'mdi-chart-bubble',
        title: 'Inspire',
        to: '/inspire',
        show: true,
      },
    ])
    const actions: Ref<[]> = ref([
      {
        icon: 'mdi-theme-light-dark',
        title: 'Theme',
        action: () => {
          ctx.root.$vuetify.theme.dark = !ctx.root.$vuetify.theme.dark
        },
        show: true,
      },
      {
        icon: 'mdi-logout-variant',
        title: 'Log out',
        action: () => {
          ctx.root.$auth.logout()
        },
        show: () => ctx.root.$auth.loggedIn, // FIXME
      },
    ])

    const onChange = (opened: boolean) => {
      ctx.emit('update:open', opened)
    }
    return {
      onChange,
      routes,
      actions,
    }
  },
})
</script>
