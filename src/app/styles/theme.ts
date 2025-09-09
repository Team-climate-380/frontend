import { colorsTuple, createTheme } from '@mantine/core'

export const theme = createTheme({
  colors: {
    'main-color': colorsTuple('#06121E'),
    'main-black-color': colorsTuple('#000000'),
    'light-text-color': colorsTuple('#898989'),
    white: colorsTuple('#FFFFFF'),
    yellow: colorsTuple('#FFD014'),
    grey: colorsTuple('#49525A'),
    'light-grey-bg': colorsTuple('#F6F8FA'),
    'dark-grey': colorsTuple('#9BAABC')
  },
  primaryColor: 'main-color'
})
