import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en_US from './locales/en_US'
import vi_VI from './locales/vi_VN'

const resources = {
	en: {
		translation: en_US
	},
	vi: {
		translation: vi_VI
	}
}

const lang = localStorage.getItem('locale')
i18n.use(initReactI18next).init({
	resources,
	lng: lang === 'en_US' ? 'en' : 'vi',
	interpolation: {
		escapeValue: false
	}
})
export default i18n
