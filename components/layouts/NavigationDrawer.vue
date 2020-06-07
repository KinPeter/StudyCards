<template>
  <v-navigation-drawer :value="open" @input="onChange" fixed app>
    <v-list>
      <v-list-item
        v-for="(item, i) in routes"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="(item, i) in actions" :key="i" @click="item.action">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

interface Props {
  routes: []
  actions: []
  open: boolean
}

export default defineComponent({
  props: {
    routes: {
      type: Array,
      required: true,
    },
    actions: {
      type: Array,
      required: true,
    },
    open: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props: Props, ctx: SetupContext) {
    const onChange = (opened: boolean) => {
      ctx.emit('update:open', opened)
    }
    return {
      onChange,
    }
  },
})
</script>
