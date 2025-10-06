import { Flex } from '@mantine/core'
import { MenuLink } from '@/shared/ui/menu-link'
import { TMenuLink } from '@/shared/ui/menu-link/types/menu-link-type'
import { routes } from '@/shared/configs/routs'
import { useDepartmentQuery } from '@/entities/groups'

export const Menu: React.FC = () => {
  const { data } = useDepartmentQuery()
  const departmentLinks = data
    ? data.map(department => ({
        id: department.id.toString(),
        name: department.department_name,
        queryKey: 'department',
        queryValue: department.id.toString()
      }))
    : []
  const links: TMenuLink[] = [
    {
      id: 'Опросы',
      link: routes.surveys(),
      name: 'Опросы',
      children: departmentLinks
    },
    {
      id: 'Люди',
      link: routes.employees(),
      name: 'Люди'
    },
    {
      id: 'Команды',
      link: routes.departments(),
      name: 'Команды'
    },
    {
      id: 'Вопросы',
      link: routes.questions(),
      name: 'Вопросы'
    }
  ]
  return (
    <Flex direction="column" gap="4px" component="nav">
      {links.map(linkInfo => {
        return <MenuLink key={linkInfo.id} {...linkInfo} />
      })}
    </Flex>
  )
}
