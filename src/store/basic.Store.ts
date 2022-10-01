import { makeAutoObservable } from 'mobx'
import { setToken, getToken, clearToken } from '@/utils/token'

class BasicStore {
	constructor() {
		makeAutoObservable(this)
	}
	token = getToken() || ''

	login = () => {
		// this.token = '12323'
		// setToken(this.token)
	}

	logout = () => {
		clearToken()
	}
}

export default BasicStore
