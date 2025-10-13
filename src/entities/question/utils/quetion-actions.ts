import { ApiClient } from '@/shared/lib/api-client'

const apiClient = new ApiClient({})

export const editQuestion = async () => {
  // возможно запрос к данным из запроса [url]/questions. далее находим item, map etc.
  const responce = await apiClient.get(`https://teamclimate.rassokha.pro:8000/api/questions`)
  alert(responce.status)
  // alert(`You are click editQuestion: id is `)
}
export const addToFavorite = (e: MouseEvent | undefined) => {
  alert(e)
  // посылаем серверу PATCH-запрос
  // apiClient.patch(`https://teamclimate.rassokha.pro:8000/api/questions/${id}`)
}
export const deleteQuestion = () => {
  alert(`You are click deleteQuestion: id is `)
  // посылаем DELETE-запрос
  // apiClient.delete(`https://teamclimate.rassokha.pro:8000/api/questions/${id}`)
}
