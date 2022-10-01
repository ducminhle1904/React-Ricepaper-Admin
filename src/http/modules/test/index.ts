import { get, post, put, deletes } from '@/http/request'

export const fetchTestApi = (params: string) => get<ISearch>('/search', { keywords: params })
export const getAllProduct = () => get('/get_all_product')
export const getProduct = (id: string) => get(`/get_product/${id}`)
export const createProduct = (product: any) => post('/create_product', { product })
export const getProductByName = (name: string) => get(`/get_product_by_name?${name}`)
export const updateProduct = (product: any) => put('/update_product', { product })
export const deleteProduct = (id: string) => deletes(`/delete_product/${id}`)
export const getProductQr = (id: string) => post(`/get_qr/${id}`)
export const getUserInfo = () => get('/user_info')
export const login = (username: string, password: string) => post('/login', { username, password })
