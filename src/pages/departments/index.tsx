import React from 'react'

const LazyDepartments = React.lazy(() => import('./departments.tsx'))

export { LazyDepartments }
