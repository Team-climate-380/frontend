import React from 'react'

const LazyEmployees = React.lazy(() => import('./ui/employees.tsx'))

export { LazyEmployees }
