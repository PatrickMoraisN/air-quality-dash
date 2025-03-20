import axios from 'axios'

const JSON_SERVER_URL = 'http://localhost:3001'

export const api = axios.create({
  baseURL: JSON_SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})
