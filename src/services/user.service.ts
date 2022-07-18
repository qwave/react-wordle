import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const getHeader = (token: string) => {
  return {
    Authorization: token,
  }
}

const getStatus = (token: string) => {
  return axios
    .post(
      API_URL + 'users/status',
      {},
      {
        headers: getHeader(token),
      }
    )
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      return error.response
    })
}

const UserService = {
  getStatus
}

export default UserService
