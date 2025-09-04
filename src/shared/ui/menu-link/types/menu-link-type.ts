export type TMenuLink = {
  id: string
  link: string
  name: string
  children?: {
    id: string
    link: string
    name: string
  }[]
}
