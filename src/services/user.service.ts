import axios from 'axios'

const API_URL = 'http://localhost:3300/api/'

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
}

export default {
  getStatus,
}
