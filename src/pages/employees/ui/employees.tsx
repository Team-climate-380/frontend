import { Header } from '@/widgets/header/header'
import style from './style.module.css'
import { Button } from '@/shared/ui/button'
import { Filter } from '@/features/filters'
import { EmployeesItem } from '@/entities/employees/ui/employee-item'
import { getEmployees } from '@/entities/employees/api/api-employees'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '@mantine/core'
import { useEffect, useState } from 'react'
import { SearchInput } from '@/widgets/search-input'
import { EmployeeForm } from '@/features/employee-form'
import { PopupMenu, PopupMenuItem } from '@/shared/ui/popup-menu'
import { Employee } from '@/entities/employees/type'
import { getPopupMenuItems } from '../configs/employees-context-menu'

const Employees: React.FC = () => {
  const [isVisibleAddEmployees, setIsVisibleAddEmployees] = useState(false)
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null)
  const [openedMenuId, setOpenedMenuId] = useState<number | null>(null)
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null)
  const [menuItems, setMenuItems] = useState<PopupMenuItem[]>([])
  const { getParam, setParams } = useQueryParams()

  useEffect(() => {
    setParams({ sort: 'edited_at' }, true)
  }, [])

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

  const handleMenuClose = () => {
    setOpenedMenuId(null)
    setMenuPosition(null)
  }

  const paramURL = `?sort=${encodeURIComponent(currentSort)}`
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['employees', paramURL],
    queryFn: async () => await getEmployees(paramURL)
  })

  const handleEmployeeUpdated = () => refetch()

  const handleAddEmployees = () => setIsVisibleAddEmployees(true)

  const handleContextMenu = (e: React.MouseEvent, employee: Employee) => {
    e.preventDefault()
    setOpenedMenuId(employee.id)
    setMenuPosition({ x: e.clientX, y: e.clientY })
    setMenuItems(getPopupMenuItems(employee, () => setEditingEmployeeId(employee.id), handleMenuClose))
  }

  return (
    <div className={style.wrapper_employees}>
      <Header
        title="Люди"
        actions={
          <>
            <SearchInput />
            <Button onClick={handleAddEmployees}>Добавить человека</Button>
          </>
        }
      >
        <Filter filters={filters} value={currentSort} />
      </Header>

      {/* форма добавления */}
      <EmployeeForm
        isOpen={isVisibleAddEmployees}
        isCreateForm={true}
        closeForm={() => {
          setIsVisibleAddEmployees(false)
        }}
        onSubmit={handleEmployeeUpdated}
      />

      <div className={`${style.employees_list} ${isVisibleAddEmployees ? style.employees_list__with_form : ''} `}>
        {data &&
          data.map(employee =>
            editingEmployeeId === employee.id ? (
              <EmployeeForm
                key={employee.id}
                isCreateForm={false}
                isOpen={true}
                employeeFormData={employee}
                closeForm={() => setEditingEmployeeId(null)}
                onSubmit={() => {
                  handleEmployeeUpdated()
                  setEditingEmployeeId(null)
                }}
              />
            ) : (
              <EmployeesItem key={employee.id} employee={employee} onContextMenu={handleContextMenu} />
            )
          )}

        {openedMenuId && menuPosition && (
          <PopupMenu
            type="context"
            items={menuItems}
            positionX={menuPosition.x}
            positionY={menuPosition.y}
            onClose={handleMenuClose}
          />
        )}

        {isLoading && (
          <div className={style.loader}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  )
}

export default Employees
