<template>
  <div class="deck-editor">
    <v-card :loading="loading" class="deck-editor__card">
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
        <v-card-title>
          {{ newDeck ? 'Add a new Deck' : 'Edit Deck' }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            :rules="rules.name"
            label="Deck name"
            type="text"
            autocomplete="name"
            required
            dense
            outlined
          />
          <v-text-field
            v-model="link"
            :rules="rules.url"
            @change="validateDeck"
            label="Link"
            type="url"
            autocomplete="url"
            required
            dense
            outlined
          />
          <div class="deck-confirmed-box">
            <p v-if="deckConfirmed" class="text-confirmed">
              <v-icon>mdi-checkbox-marked-circle</v-icon>
              Deck confirmed! ({{ numberOfCards }} cards)
            </p>
            <p v-else class="text-not-confirmed">
              <v-icon>mdi-alert</v-icon>
              Deck is not confirmed yet.
            </p>
          </div>
          <v-checkbox
            v-model="shuffle"
            label="Shuffle cards on first save"
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!valid || !deckConfirmed"
            color="primary"
            type="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, SetupContext } from '@vue/composition-api'

function validateUrl(url: string): boolean {
  const urlRegex = new RegExp(
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)\.tsv$/
  )
  return urlRegex.test(url)
}

export default defineComponent({
  props: {
    newDeck: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, ctx: SetupContext) {
    const loading: Ref<boolean> = ref(false)
    const valid: Ref<boolean> = ref(false)
    const error: Ref<boolean> = ref(false)
    const rules = {
      name: [
        (v: string) =>
          (!!v && v.length > 3) || 'That should be a bit longer...',
      ],
      url: [
        (v: string) => validateUrl(v) || 'Must be a valid URL to a TSV file',
      ],
    }
    const name: Ref<string> = ref('')
    const link: Ref<string> = ref('')
    const shuffle: Ref<boolean> = ref(false)
    const numberOfCards: Ref<number> = ref(0)
    const deckConfirmed: Ref<boolean> = ref(!props.newDeck)

    const validateDeck = async () => {
      deckConfirmed.value = false
      await ctx.root.$services.deck.fetch(link.value)
    }

    const onSubmit = async () => {
      loading.value = true
      error.value = false
      try {
        // await ctx.root.$auth.loginWith('custom', username.value, password.value)
        // ctx.root.$router.push('/decks')
      } catch (e) {
        if (e.response.status === 401) {
          error.value = true
        } else {
          ctx.root.$nuxt.error(e)
        }
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      valid,
      error,
      rules,
      name,
      link,
      deckConfirmed,
      shuffle,
      numberOfCards,
      validateDeck,
      onSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.deck-editor {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.deck-editor__card {
  width: 100%;
  max-width: 400px;
}

.v-card__text {
  padding-bottom: 0;
}

.v-card__actions {
  padding: 8px 16px 16px 16px;
}

.v-btn {
  width: 100%;
}

.deck-confirmed-box p .v-icon {
  color: inherit;
  margin-right: 4px;
}

.text-not-confirmed {
  color: var(--v-warning-base);
}

.text-confirmed {
  color: var(--v-success-base);
}
</style>
