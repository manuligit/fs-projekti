import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

let config = null
let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne =  async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { 'Authorization': token }
  }
}

const removeToken = () => {
  token = null
  config = null
}

const create = async (newObject) => {
  if (token && token.length < 8) {
    config = null
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  console.log('response data :::: ', response.data)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, getOne, create, update, remove, setToken, removeToken }