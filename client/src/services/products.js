import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/products'

let token = null
let config = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne =  async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const setToken = (newToken) => {
  if (newToken) {
    token = `bearer ${newToken}`
    config = {
      headers: { 'Authorization': token }
    }
  } else {
    token = null
    config = null
  }
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

// const updateFavorites = async (id, newObject, favoriteId) => {
//   config.headers = { ...config.headers, 'addFavorite': favoriteId }
//   const response = await axios.put(`${baseUrl}/${id}`, newObject)
//   return response.data
// }

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, getOne, create, update, remove, setToken }