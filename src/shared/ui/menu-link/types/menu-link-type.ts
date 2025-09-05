export type TMenuLink = {
  id: string
  link: string
  name: string
  children?: {
    id: string
    queryParam: string
    name: string
  }[]
}
