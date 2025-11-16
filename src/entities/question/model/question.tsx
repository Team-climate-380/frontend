import { FC } from 'react'
import { QuestionUI } from '../ui/question-ui'
import { IQuestion } from '../type'

export const Question: FC<
  IQuestion & { allowContextMenu?: boolean; setQuestion?: (item: IQuestion | undefined) => void }
> = question => {
  return (
    <QuestionUI
      numeration={question.numeration}
      id={question.id}
      is_favorite={question.is_favorite}
      text={question.text}
      question_type={question.question_type}
      allowContextMenu={question.allowContextMenu}
      setQuestion={question.setQuestion}
      to_delete={question.to_delete}
    />
  )
}
