import axios from 'axios'

const API_URL = 'http://localhost:3300/api/'

const getHeader = (token: string) => {
  return {
    Authorization: token,
  }
}

const start = (token: string) => {
  return axios
    .post(
      API_URL + 'game/start',
      {},
      {
        headers: getHeader(token),
      }
    )
    .then((response) => {
      return response.data
    })
}

const attempt = (token: string, word: string) => {
  return axios
    .post(
      API_URL + 'game/attempt',
      {
        word,
      },
      {
        headers: getHeader(token),
      }
    )
    .then((response) => {
      return response.data
    })
}

const rating = (token: string) => {
  return axios
    .get(
      API_URL + 'game/rating',
      {
        headers: getHeader(token),
      }
    )
    .then((response) => {
      return response.data
    })
}

export default {
  start,
  attempt,
  rating
}
