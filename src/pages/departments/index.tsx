import React from 'react'

const LazyDepartments = React.lazy(() => import('./ui/departments.tsx'))

export { LazyDepartments }
