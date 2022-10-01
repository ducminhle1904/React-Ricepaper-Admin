import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import ErrorHandle from './errorHandler'
import { message } from 'antd'
import { ResponseCode, ResponseKey } from './enum'
import { getToken } from '@/utils/token'

class NRequest {
	protected instance: AxiosInstance | null = null

	constructor(config: AxiosRequestConfig, prefix: string = '') {
		const { baseURL, ...rest } = config
		const token = getToken()

		this.instance = axios.create({
			baseURL: prefix ? baseURL + prefix : baseURL,
			timeout: 1000 * 20,
			withCredentials: true,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			...rest
		})

		this.requestInterceptor()
		this.responseInterceptor()
	}

	private requestInterceptor() {
		this.instance!.interceptors.request.use(
			(config: AxiosRequestConfig = {}) => {
				if (config.headers) {
				}

				return config
			},
			(error: AxiosError) => {
				message.error(error.message)
				return Promise.reject(error)
			}
		)
	}

	private responseInterceptor() {
		this.instance!.interceptors.response.use(
			(response: AxiosResponse): Promise<Result> => {
				return new Promise((resolve, reject) => {
					const { status, data } = response

					if (status !== 200) reject(data)

					if (data[ResponseKey.CODE] !== ResponseCode.SUCCESS) {
						message.error(data[ResponseKey.MESSAGE])

						ErrorHandle[data[ResponseKey.CODE] as keyof typeof ErrorHandle]()
						reject(data)
					}

					resolve(data)
				})
			},
			(error) => {
				message.error(error.message)

				return Promise.reject(error)
			}
		)
	}

	public request<T>(config: AxiosRequestConfig<T>): Promise<Result<T>> {
		return this.instance!.request(config)
	}

	public get = <T>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<Result<T>> => {
		const option: AxiosRequestConfig = {
			url,
			method: 'GET',
			params,
			...config
		}
		return this.request(option)
	}

	public post = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<Result<T>> => {
		const option: AxiosRequestConfig = {
			url,
			method: 'POST',
			data,
			...config
		}
		return this.request(option)
	}

	public put = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<Result<T>> => {
		const option: AxiosRequestConfig = {
			url,
			method: 'PUT',
			data,
			...config
		}
		return this.request(option)
	}

	public deletes = <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<Result<T>> => {
		const option: AxiosRequestConfig = {
			url,
			method: 'DELETE',
			data,
			...config
		}
		return this.request(option)
	}
}

const { get, post, put, deletes } = new NRequest({
	baseURL: 'https://ken-inventory-api.fly.dev'
})

export { get, post, put, deletes }

export default NRequest
