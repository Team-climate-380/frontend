import { updateQuestion } from '../api/update-question'

export const editQuestion = async (id: number) => {
  alert(`You are click editQuestion: id is ${id}`)
}
export const toggleFavorite = async (id: number, currentState: boolean) => {
  alert(`You are click addToFavorite: id is ${id}`)
  const resp = await updateQuestion(id, { is_favorite: !currentState })
  alert(resp?.is_favorite)
}
