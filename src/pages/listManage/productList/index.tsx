import TableData from '@/components/tableData'
import { observer } from 'mobx-react-lite'

function ProductList() {
	const styles: any = {
		overflowX: 'auto'
	}
	return (
		<div style={styles} className="cs-card">
			<TableData />
		</div>
	)
}

export default observer(ProductList)
