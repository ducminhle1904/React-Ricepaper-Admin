import { message } from 'antd'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { getToken } from './token'

const TOKEN_KEY = 'AuthenticationToken'

const token = getToken()

const request: AxiosInstance = axios.create({
	baseURL: 'https://ken-inventory-api.fly.dev',
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json'
	}
})

request.interceptors.request.use((config: AxiosRequestConfig) => {
	const newConfig = { ...config }
	return newConfig
})

request.interceptors.response.use(
	(response: AxiosResponse) => {
		return response
	},

	(error: AxiosError<unknown>) => {
		message.error(error.message)
		return Promise.reject(error.response)
	}
)

export default request
