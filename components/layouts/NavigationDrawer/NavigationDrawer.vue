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
    <template v-if="$accessor.menu.deckActions">
      <v-divider></v-divider>
      <v-list>
        <NavigationDrawerItem
          :type="NavigationDrawerItemType.ACTION"
          @click="onAddNewDeck"
          title="Add new Deck"
          icon="mdi-plus"
        />
      </v-list>
    </template>
    <template v-if="$accessor.menu.practiceActions">
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
import { DeckResource } from '~/services/deck/types/DeckResource'

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

    const onSave = async () => {
      ctx.root.$accessor.saveIndicator.showLoading()
      try {
        const loadedDeck = ctx.root.$accessor.decks.loadedDeck
        const deckToSave: DeckResource = {
          id: loadedDeck.id,
          userId: ctx.root.$auth.user.id,
          name: loadedDeck.name,
          link: loadedDeck.link,
          progress: JSON.stringify(loadedDeck.progress),
        }
        await ctx.root.$services.deck.update(deckToSave)
        ctx.root.$accessor.saveIndicator.hideLoading()
        ctx.root.$accessor.saveIndicator.showSaved()
      } catch (_e) {
        ctx.root.$accessor.saveIndicator.showError()
      }
    }

    const onAddNewDeck = () => {
      ctx.root.$router.push('/decks/add')
    }

    return {
      NavigationDrawerItemType,
      themeTitle,
      onAddNewDeck,
      onToggleTheme,
      onLogout,
      onChange,
      onSave,
    }
  },
})
</script>
