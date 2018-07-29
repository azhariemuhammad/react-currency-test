import * as React from 'react';

import {CurrencyTable} from './CurrencyTable'
import { getData } from '../api'

type MyState = { base: string, date: string, rates: object };
export default class Currency extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props)
    this.state = {
      base: '',
      date: '',
      rates: {}
    }
  }

  // componentWillMount() {
  //   getData().then(({data}) => {
  //     this.setState({
  //       base: data.base,
  //       date: data.date,
  //       rates: data.rates
  //     })
  //   })
  // }

  render() {
    return (
      <div>
        <CurrencyTable />
      </div>
    )
  }


}