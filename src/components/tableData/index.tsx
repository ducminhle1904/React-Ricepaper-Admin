import { createProduct, deleteProduct, getAllProduct, getProductQr, updateProduct } from '@/utils/apiCall'
import { IconEye, IconPencil, IconTrashX } from '@tabler/icons'
import { Button, Space, Table, Tooltip, Modal, Form, Input, message, Image } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { FC, useEffect, useState } from 'react'
import { isEmptyObject } from '@/helpers/common'
import { generateCurrency } from '@/helpers/moneyHelper'
import { RowData } from '@/models'
import { Buffer } from 'buffer'

const emptyData = {
	id: '',
	productName: '',
	quantity: '',
	sold: '',
	price: '',
	productSku: ''
}

const TableData: FC = () => {
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [data, setData] = useState()
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [initialValues, setInitialValues] = useState<RowData>(emptyData)
	const [qrImage, setQrImage] = useState('')
	const [form] = Form.useForm()

	const columns: ColumnsType<RowData> = [
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
			render: (productName) => <span className="font-bold text-[#002358]">{productName}</span>
		},
		{
			title: 'Tồn kho',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (quantity) => <span className="font-bold text-[#002358]">{quantity}</span>
		},
		{
			title: 'Đã bán',
			dataIndex: 'sold',
			key: 'sold',
			render: (sold) => <span className="font-bold text-[#002358]">{sold | 0}</span>
		},
		{
			title: 'Giá niêm yết',
			dataIndex: 'price',
			key: 'price',
			render: (price) => <span className="font-bold text-[#002358]">{generateCurrency(price)}</span>
		},
		{
			title: '',
			dataIndex: 'tools',
			key: 'tools',
			width: '15%',
			render: (_, record) => (
				<Space size="middle">
					<Tooltip title="Sửa sản phẩm">
						<Button type="primary" icon={<IconPencil />} onClick={() => editProduct(record)} key={record.id} />
					</Tooltip>
					<Tooltip title="Xóa sản phẩm">
						<Button
							type="primary"
							icon={<IconTrashX />}
							danger
							ghost
							onClick={() => handleDeleteProduct(record)}
							key={record.id}
						/>
					</Tooltip>
					<Tooltip title="Xem mã QR">
						<Button
							className="flex items-center justify-center"
							type="text"
							icon={<IconEye />}
							key={record.id}
							onClick={() => getQR(record)}
						/>
					</Tooltip>
				</Space>
			)
		}
	]

	const getQR = async (product: RowData) => {
		const data = await getProductQr(product.id)
		Modal.info({
			title: `Mã QR sản phẩm ${product.productName}`,
			content: <Image src={`data:image/jpeg;base64,${data.response}`} />,
			onOk() {
				const a = document.createElement('a')
				a.href = `data:image/png;base64,${data.response}`
				a.download = `${product.productName}.png`
				a.click()
			},
			closable: true,
			okText: 'Tải xuống mã QR'
		})
	}

	useEffect(() => {
		form.setFieldsValue(initialValues)
	}, [form, initialValues])

	useEffect(() => {
		getAllProduct().then((res) => setData(res.response))
	}, [])

	const onFinish = (values: RowData) => {
		if (isEmptyObject(initialValues)) {
			createProduct(values).then((res) => {
				setLoading(true)
				getAllProduct().then((res) => {
					setData(res.response)
					setLoading(false)
					message.success('Thêm sản phẩm thành công')
				})
			})
		} else {
			updateProduct({ ...values, id: initialValues.id }).then((res) => {
				setLoading(true)
				getAllProduct().then((res) => {
					setData(res.response)
					setLoading(false)
					message.success('Cập nhật thành công')
				})
			})
		}
	}

	const editProduct = (product: RowData) => {
		setOpen(true)
		setInitialValues(product)
	}

	const handleDeleteProduct = (product: RowData) => {
		Modal.warning({
			title: `Xóa sản phẩm ${product.productName}`,
			content: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
			closable: true,
			onOk: () => {
				deleteProduct(product.id).then((res) => {
					setLoading(true)
					getAllProduct().then((res) => {
						setData(res.response)
						setLoading(false)
						message.success('Xóa sảm phẩm thành công')
					})
				})
			}
		})
	}

	const handleOk = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			setOpen(false)
		}, 1000)
	}

	const onSelectChange = (newSelectedRowKeys: any) => {
		setSelectedRowKeys(newSelectedRowKeys)
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange
	}
	return (
		<div>
			<Table
				rowSelection={rowSelection}
				columns={columns}
				dataSource={data}
				rowKey="id"
				title={() => (
					<Button
						className="flex justify-end"
						onClick={() => {
							setOpen(true)
							setInitialValues(emptyData)
						}}
					>
						Tạo sản phẩm
					</Button>
				)}
			/>
			<Modal
				open={open}
				title={`Chỉnh sửa ${initialValues.productName}`}
				onOk={handleOk}
				onCancel={() => setOpen(false)}
				footer={[
					<Button key="back" onClick={() => setOpen(false)}>
						Hủy
					</Button>,
					<Button key="submit" form="myForm" htmlType="submit" type="ghost" loading={loading} onClick={handleOk}>
						{isEmptyObject(initialValues) ? 'Tạo sản phẩm' : 'Cập nhật sản phẩm'}
					</Button>
				]}
			>
				<Form
					form={form}
					name="myForm"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={initialValues}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						label="Tên sản phẩm"
						name="productName"
						rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Mã sản phẩm"
						name="productSku"
						rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item label="Tồn kho" name="quantity" rules={[{ required: true, message: 'Vui lòng nhập tồn kho!' }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Giá niêm yết" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default TableData
