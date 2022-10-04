import { lazy } from 'react'
export const list = [
	{
		path: '/productList', // 用户列表
		name: 'productList',
		component: lazy(() => import('@/pages/listManage/productList'))
	},
	{
		path: '/diaryList', // 日记列表
		name: 'diaryList',
		component: lazy(() => import('@/pages/listManage/diaryList'))
	},
	{
		path: '/diaryRecords', // 日记记录
		name: 'diaryRecords',
		component: lazy(() => import('@/pages/listManage/diaryRecords'))
	}
]
