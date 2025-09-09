import React from 'react'

const LazyQuestions = React.lazy(() => import('./ui/questions.tsx'))

export { LazyQuestions }
