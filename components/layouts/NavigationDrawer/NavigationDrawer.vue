<template>
  <v-navigation-drawer :value="open" @input="onChange" fixed app>
    <v-list v-if="$auth.loggedIn">
      <NavigationDrawerItem
        :type="NavigationDrawerItemType.ROUTE"
        route="/decks"
        title="My Decks"
        icon="mdi-cards"
      />
      <NavigationDrawerItem
        :type="NavigationDrawerItemType.ROUTE"
        route="/practice"
        title="Practice"
        icon="mdi-view-grid"
      />
    </v-list>
    <template v-if="$store.getters['menu/practiceActions']">
      <v-divider></v-divider>
      <v-list>
        <NavigationDrawerItem
          :type="NavigationDrawerItemType.ACTION"
          @click="onSave"
          title="Save progress"
          icon="mdi-content-save"
        />
      </v-list>
    </template>
    <v-divider></v-divider>
    <v-list>
      <NavigationDrawerItem
        :type="NavigationDrawerItemType.ACTION"
        @click="onToggleTheme"
        :title="themeTitle"
        icon="mdi-theme-light-dark"
      />
      <NavigationDrawerItem
        v-if="$auth.loggedIn"
        :type="NavigationDrawerItemType.ACTION"
        @click="onLogout"
        title="Log out"
        icon="mdi-logout-variant"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api'
import NavigationDrawerItem from '~/components/layouts/NavigationDrawer/NavigationDrawerItem.vue'
import { NavigationDrawerItemType } from '~/components/layouts/NavigationDrawer/NavigationDrawerItemType'

interface Props {
  open: boolean
}

export default defineComponent({
  components: {
    NavigationDrawerItem,
  },

  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },

  setup(_props: Props, ctx: SetupContext) {
    const themeTitle = computed(() => {
      return ctx.root.$vuetify.theme.dark ? 'Light theme' : 'Dark theme'
    })
    const onToggleTheme = () => {
      ctx.root.$vuetify.theme.dark = !ctx.root.$vuetify.theme.dark
    }

    const onLogout = () => {
      ctx.root.$auth.logout()
    }

    const onChange = (opened: boolean) => {
      ctx.emit('update:open', opened)
    }

    const onSave = () => {
      // noop
    }

    return {
      NavigationDrawerItemType,
      themeTitle,
      onToggleTheme,
      onLogout,
      onChange,
      onSave,
    }
  },
})
</script>
