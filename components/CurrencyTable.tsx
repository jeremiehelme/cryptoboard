import { Component } from 'react'
import DataTable from 'react-data-table-component';
import { Currency } from 'model/Currency'

type MyProps = { currencies: Currency[], columns: any[] };


class CurrencyTable extends Component<MyProps, {}>  {

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