import axios from 'axios'

const API_URL = 'http://5.58.204.33:3300/api/'

const login = (username: string, email: string) => {
  return axios
    .post(API_URL + 'users', {
      username,
      email
    })
    .then((response) => {
      return response.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
}

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user')
  if (userStr) return JSON.parse(userStr)
  return null
}

export default {
  login,
  logout,
  getCurrentUser
}
