import { Header } from '@/widgets/header/header'
import style from './style.module.css'
import { Button } from '@/shared/ui/button'
import { Filter } from '@/features/filters'
import { EmployeesItem } from '@/entities/employees/ui/employee-item'
import { cancelDeleteEmployee, getEmployees } from '@/entities/employees/api/api-employees'
import { useQueryParams } from '@/shared/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { SearchInput } from '@/widgets/search-input'
import { EmployeeForm } from '@/features/employee-form'
import { PopupMenu, PopupMenuItem } from '@/shared/ui/popup-menu'
import { Employee } from '@/entities/employees/type'
import { getPopupMenuItems } from '../configs/employees-context-menu'
import { useContextMenu } from '@/shared/hooks/use-context-menu'
import { CancelDeleteButton } from '@/shared/ui/cancel-delete-button'
import { Skeleton } from '@/shared/ui/skeleton'
import { TextNotification } from '@/shared/ui/text-notification'

const Employees: React.FC = () => {
  const [isVisibleAddEmployees, setIsVisibleAddEmployees] = useState(false)
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>()
  const [menuItems, setMenuItems] = useState<PopupMenuItem[]>([])

  const { contextMenu, handleRightClick, handleContextMenuClose } = useContextMenu(undefined, 10, 0)

  const { getParam, setParams, getDecodedSearch } = useQueryParams()

  useEffect(() => {
    setParams({ sort: 'edited_at', order: 'desc' }, true)
  }, [])

  const currentSort = getParam('sort') || 'edited_at'
  const currentOrder = getParam('order')

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
        setParams({ sort: 'edited_at', order: 'desc' }, true)
      }
    }
  ]

  const queryParams = useMemo(() => {
    const paramsURL: Record<string, string> = {
      sort: currentSort
    }
    if (currentOrder && currentOrder !== '') {
      paramsURL.order = currentOrder
    }

    return paramsURL
  }, [currentSort, currentOrder])

  const paramsURL = '?' + new URLSearchParams(queryParams).toString()
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ['employees', paramsURL],
    queryFn: async () => await getEmployees(paramsURL)
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

  const handleMenuClose = () => {
    handleContextMenuClose()
    setMenuItems([])
  }

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

  const hasError = isError || (data === null && !isLoading)
  const hasSearchQuery = Boolean(searchQuery.trim())
  const isNoSearchResult = hasSearchQuery && searchEmployees.length === 0

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
        {isLoading && <Skeleton />}

        {hasError && <TextNotification variant="data_not_loaded" />}

        {isNoSearchResult && <TextNotification variant="no_search_result" />}

        {!isNoSearchResult &&
          searchEmployees.map(employee => {
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
      </div>
    </div>
  )
}

export default Employees
