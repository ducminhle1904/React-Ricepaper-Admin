import {
	IconUserPlus,
	IconDiscount2,
	IconReceipt2,
	IconCoin,
	IconArrowDownRight,
	IconArrowUpRight
} from '@tabler/icons'
import { Card, Col, Row, Typography } from 'antd'
import React from 'react'

const { Title, Text } = Typography

const Stats: React.FC = () => (
	<div className="site-card-wrapper">
		<Row gutter={[16, 16]}>
			<Col xs={24} sm={24} md={12} lg={8} xl={6}>
				<Card title="Doanh thu" extra={<IconReceipt2 color="gray" />} className="min-h-[200px]">
					<div className="flex flex-col">
						<div className="flex items-center gap-2">
							<Title level={4}>50.000.000 VND</Title>
							<div className="flex items-center">
								<Text type="success">34%</Text>
								<IconArrowUpRight size={16} color="#52c41a" />
							</div>
						</div>
						<Text>So với tháng trước</Text>
					</div>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={12} lg={8} xl={6}>
				<Card title="Lợi nhuận" extra={<IconCoin color="gray" />} className="min-h-[200px]">
					<div className="flex flex-col">
						<div className="flex items-center gap-2">
							<Title level={4}>25.000.000 VND</Title>
							<div className="flex items-center">
								<Text type="danger">-13%</Text>
								<IconArrowDownRight size={16} color="#ff4d4f" />
							</div>
						</div>
						<Text>So với tháng trước</Text>
					</div>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={12} lg={8} xl={6}>
				<Card title="Số lượng hàng bán" extra={<IconDiscount2 color="gray" />} className="min-h-[200px]">
					<div className="flex flex-col">
						<div className="flex items-center gap-2">
							<Title level={4}>456</Title>
							<div className="flex items-center">
								<Text type="success">18%</Text>
								<IconArrowUpRight size={16} color="#52c41a" />
							</div>
						</div>
						<Text>So với tháng trước</Text>
					</div>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={12} lg={8} xl={6}>
				<Card title="Khách hàng mới" extra={<IconUserPlus color="gray" />} className="min-h-[200px]">
					<div className="flex flex-col">
						<div className="flex items-center gap-2">
							<Title level={4}>100</Title>
							<div className="flex items-center">
								<Text type="danger">-30%</Text>
								<IconArrowDownRight size={16} color="#ff4d4f" />
							</div>
						</div>
						<Text>So với tháng trước</Text>
					</div>
				</Card>
			</Col>
		</Row>
	</div>
)

export default Stats
