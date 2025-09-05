import { Flex } from '@mantine/core'
import { MenuLink } from '@/shared/ui/menu-link'
import { TMenuProps } from '../types/menu-type'

export const Menu: React.FC<TMenuProps> = ({ linksInfo }: TMenuProps) => {
  return (
    <Flex direction="column" gap="4px" component="nav">
      {linksInfo.map(linkInfo => {
        return <MenuLink key={linkInfo.id} {...linkInfo} />
      })}
    </Flex>
  )
}
