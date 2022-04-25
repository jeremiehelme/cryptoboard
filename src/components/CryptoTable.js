import { Component } from 'react'
import DataTable from 'react-data-table-component'

class CryptoTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { data, columns } = this.props

        return (
            this.props.data.length > 0 && (
                <DataTable columns={columns} data={data} />
            )
        )
    }
}

export default CryptoTable
