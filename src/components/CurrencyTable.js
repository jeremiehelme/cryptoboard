import { Component } from 'react'
import DataTable from 'react-data-table-component';



class CurrencyTable extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { currencies, columns } = this.props;

    return (
      this.props.currencies.length > 0 && (

        <DataTable
          columns={columns}
          data={currencies}
        />

      )
    );
  }
}

export default CurrencyTable