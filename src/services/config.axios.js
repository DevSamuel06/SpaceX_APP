
import axios from 'axios'

const auth = axios.create({
  baseURL: `https://api.spacexdata.com/v4`,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})

export default auth
