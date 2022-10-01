import TableData from '@/components/tableData'

function UserList() {
	const styles: any = {
		overflowX: 'auto'
	}
	return (
		<div style={styles} className="cs-card">
			<TableData />
		</div>
	)
}

export default UserList
