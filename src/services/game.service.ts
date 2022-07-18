import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

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
      return response
    })
    .catch(function (error) {
      return error.response
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
      return response
    })
    .catch(function (error) {
      return error.response
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
      return response
    })
    .catch(function (error) {
      return error.response
    })
}

const GameService = {
  start,
  attempt,
  rating
}

export default GameService
