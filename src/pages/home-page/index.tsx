import React from 'react'

const LazyHomePage = React.lazy(() => import('./ui/home-page.tsx'))

export { LazyHomePage }
