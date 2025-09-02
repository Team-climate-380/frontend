import React from 'react'

const LazyLoginPage = React.lazy(() => import('./ui/login-page.tsx'))

export { LazyLoginPage }
