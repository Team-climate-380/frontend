import { createTheme, MantineColorsTuple } from '@mantine/core'

const usedColors: MantineColorsTuple = [
  '#ffffff',
  '#f6f8fA',
  '#cdcdcd',
  '#b2b2b2',
  '#9a9a9a',
  '#8b8b8b',
  '#848484',
  '#717171',
  '#06121e',
  '#000000'
]

export const theme = createTheme({
  colors: { usedColors },
  primaryColor: 'usedColors'
})
