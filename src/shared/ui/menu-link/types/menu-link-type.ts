export type TMenuLink = {
  id: string
  link: string
  name: string
  children?: {
    id: string
    queryKey: string
    queryValue: string
    name: string
  }[]
}
