import { Header } from '@/widgets/header/header'
import style from './style.module.css'
import { Button } from '@/shared/ui/button'
import { Filter } from '@/features/filters'
import { EmployeesItem } from '@/entities/employees/ui/employee-item'
import { cancelDeleteEmployee, getEmployees } from '@/entities/employees/api/api-employees'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import { Loader } from '@shared/ui/loader'
import { useEffect, useMemo, useState } from 'react'
import { SearchInput } from '@/widgets/search-input'
import { EmployeeForm } from '@/features/employee-form'
import { PopupMenu, PopupMenuItem } from '@/shared/ui/popup-menu'
import { Employee } from '@/entities/employees/type'
import { getPopupMenuItems } from '../configs/employees-context-menu'
import { useContextMenu } from '@/shared/hooks/use-context-menu'
import { CancelDeleteButton } from '@/shared/ui/cancel-delete-button'
const Employees: React.FC = () => {
  const [isVisibleAddEmployees, setIsVisibleAddEmployees] = useState(false)
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>()
  const [menuItems, setMenuItems] = useState<PopupMenuItem[]>([])

  const { contextMenu, handleRightClick, handleContextMenuClose } = useContextMenu(undefined, 10, 0)

  const { getParam, setParams, getDecodedSearch } = useQueryParams()

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
      title: 'По дате добавления',
      value: 'edited_at',
      setValue: () => {
        setParams({ sort: 'edited_at' }, true)
      }
    }
  ]

  const handleMenuClose = () => {
    handleContextMenuClose()
    setMenuItems([])
  }

  const paramURL = `?sort=${encodeURIComponent(currentSort)}`
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ['employees', paramURL],
    queryFn: async () => await getEmployees(paramURL)
  })

  const searchQuery = getDecodedSearch()
  const searchEmployees = useMemo(() => {
    if (!data) return []
    if (!searchQuery.trim()) return data
    const query = searchQuery.trim().toLowerCase()
    return data.filter(employee => {
      const searchFields = [employee.full_name, employee.department_name, employee.email, employee.tg_username].filter(
        Boolean
      )

      return searchFields.some(field => field.toLowerCase().includes(query))
    })
  }, [data, searchQuery])

  const handleEmployeeUpdated = () => refetch()

  const handleAddEmployees = () => setIsVisibleAddEmployees(true)

  const handleCancelDelete = async (id: number) => {
    await cancelDeleteEmployee(id)
    handleEmployeeUpdated()
  }

  const handleContextMenu = (e: React.MouseEvent, employee: Employee) => {
    e.preventDefault()
    if (employee.to_inactivate) return
    handleRightClick(e, employee.id)
    setMenuItems(getPopupMenuItems(employee, setEditingEmployeeId, handleMenuClose, handleEmployeeUpdated))
  }
  const hasError = isError || data === null

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

      <EmployeeForm
        isOpen={isVisibleAddEmployees}
        isCreateForm={true}
        closeForm={() => {
          setIsVisibleAddEmployees(false)
        }}
        onSubmit={handleEmployeeUpdated}
      />

      <div className={`${style.employees_list} ${isVisibleAddEmployees ? style.employees_list__with_form : ''} `}>
        {searchEmployees &&
          searchEmployees
            .slice()
            .reverse()
            .map(employee => {
              const isEditingEmployee = editingEmployeeId === employee.id
              const isDeleted = employee.to_inactivate
              if (isEditingEmployee) {
                return (
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
                )
              } else {
                return (
                  <div key={employee.id}>
                    <EmployeesItem employee={employee} onContextMenu={handleContextMenu} isDeleted={isDeleted}>
                      {isDeleted && (
                        <CancelDeleteButton
                          itemLabel="сотрудника"
                          onClick={() => handleCancelDelete(employee.id)}
                          styles={{
                            root: {
                              backgroundColor: 'inherit'
                            }
                          }}
                        />
                      )}
                    </EmployeesItem>
                  </div>
                )
              }
            })}

        {contextMenu.isVisible && contextMenu.selectedId && menuItems.length > 0 && (
          <PopupMenu
            type="context"
            items={menuItems}
            positionX={contextMenu.left}
            positionY={contextMenu.top}
            onClose={handleMenuClose}
          />
        )}
        {isLoading && <Loader />}
        {hasError && !isLoading && (
          <div className={style.error_message}>
            <p>Произошла ошибка при загрузке сотрудников</p>
            <Button onClick={handleEmployeeUpdated}>Попробовать снова</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Employees
