import axios from 'axios'

const BASE_API_URL = 'https://exchangeratesapi.io/api'
const exchange = 'USD'

axios.defaults.baseURL = BASE_API_URL
export const getData = () => {
  return axios.get(`/latest?base=${exchange}`)
    .then(res => res)
    .catch(error => error.responses)
}
