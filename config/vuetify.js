import colors from 'vuetify/lib/util/colors'

export default {
  theme: {
    options: {
      customProperties: true,
    },
    dark: false,
    themes: {
      light: {
        primary: colors.blue.lighten1,
        secondary: colors.lime.darken2,
        accent: colors.blue.lighten1,
        shades: {
          base: colors.shades.white,
        },
        grey: colors.grey,
      },
    },
  },
}
