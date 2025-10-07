import { Header } from '@/widgets/header/header'
import style from './style.module.css'
import { Button } from '@/shared/ui/button'
import { Filter } from '@/features/filters'
import { EmployeesItem } from '@/entities/employees/ui/employee-item'
import { getEmployees } from '@/entities/api/get-employees'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import { Loader, ScrollArea } from '@mantine/core'

const Employees: React.FC = () => {
  const { getParam, setParams } = useQueryParams()
  const currentSort = getParam('sort') || 'edited_at'
  const filters = [
    {
      title: 'По алфавиту',
      value: 'full_name',
      setValue: () => {
        setParams({ sort: 'full_name' }, true)
      }
    },
    {
      title: 'По дате обновления',
      value: 'edited_at',
      setValue: () => {
        setParams({ sort: 'edited_at' }, true)
      }
    }
  ]
  const paramURL = `?sort=${encodeURIComponent(currentSort)}`
  const { data, isLoading } = useQuery({
    queryKey: ['employees', paramURL],
    queryFn: async () => await getEmployees(paramURL)
  })
  return (
    <div className={style.wrapper_employees}>
      <Header title="Люди" actions={<Button>Добавить человека</Button>}>
        <Filter filters={filters} value={currentSort} />
      </Header>
      <ScrollArea h={'120vh'} type="scroll">
        <div className={style.employees_list}>
          {data && data.map((employee, index) => <EmployeesItem key={index} employee={employee} />)}
          {isLoading && (
            <div className={style.loader}>
              <Loader />
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Employees
