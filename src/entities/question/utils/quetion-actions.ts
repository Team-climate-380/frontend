export const editQuestion = async (id: number) => {
  alert(`You are click editQuestion: id is ${id}`)
}
export const addToFavorite = async (id: number) => {
  alert(`You are click addToFavorite: id is ${id}`)
  // посылаем серверу PATCH-запрос
  // apiClient.patch(`https://teamclimate.rassokha.pro:8000/api/questions/${id}`)
}
export const deleteQuestion = async (id: number) => {
  alert(`You are click deleteQuestion: id is ${id}`)
  // посылаем DELETE-запрос
  // apiClient.delete(`https://teamclimate.rassokha.pro:8000/api/questions/${id}`)
}
