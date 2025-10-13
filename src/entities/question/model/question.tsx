import React, { FC, useState } from 'react'
import { QuestionUI } from '../ui/question-ui'
// import { ApiClient } from '@/shared/lib/api-client'
import { IQuestion } from '../type'

export const Question: FC<IQuestion> = questions => {
  const [dropdownVisible, setDropdownVisible] = useState(false) // zustand
  const [editMenuVisible, setEditMenuVisible] = useState(false) // zustand
  // Здесь код для работы с данными вопроса.
  // START TEST ACTION
  // const api = new ApiClient({}) // create api&use

  const handleClick = () => {
    setDropdownVisible(prev => !prev) // toggle station
    setEditMenuVisible(prev => !prev) // temp
  }

  // ENDN TEST ACTION
  return (
    <QuestionUI
      id={questions.id}
      is_favorite={questions.is_favorite}
      text={questions.text}
      question_type={questions.question_type}
      action={handleClick}
      dropdownActive={dropdownVisible}
      editMenuVisible={editMenuVisible}
    />
  )
}
