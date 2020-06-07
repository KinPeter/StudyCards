<template>
  <div class="login">
    Login page
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  auth: false,
  setup(_props, _ctx: SetupContext) {},
})
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
}
</style>
