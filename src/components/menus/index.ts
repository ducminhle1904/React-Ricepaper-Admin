import { MenuItem } from './index.d'
import { AppstoreOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
export const menus: Array<MenuItem> = [
	{
		key: 'panel',
		label: 'aside.panel.nav',
		icon: AppstoreOutlined,
		children: [
			{
				path: '/analysisPanel',
				key: 'analysisPanel',
				label: 'aside.panel.analysis_panel'
			}
		]
	},
	{
		key: 'list',
		label: 'aside.list.nav',
		icon: UnorderedListOutlined,
		children: [
			{
				path: '/productList',
				key: 'productList',
				label: 'aside.list.user_list'
			},
			{
				path: '/diaryList',
				key: 'diaryList',
				label: 'aside.list.diary_list'
			},
			{
				path: '/diaryRecords',
				key: 'diaryRecords',
				label: 'aside.list.diary_records'
			}
		]
	},
	{
		key: 'personal',
		label: 'aside.personal.nav',
		icon: UserOutlined,
		children: [
			{
				path: '/personalStatus',
				key: 'personalStatus',
				label: 'aside.personal.personal_status'
			}
		]
	}
]
