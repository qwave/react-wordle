import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

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

const AuthService = {
  login,
  logout,
  getCurrentUser
}

export default AuthService
