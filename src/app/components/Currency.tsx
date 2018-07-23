import * as React from 'react'

import { getData } from '../api'

export default class Currency extends React.Component<{}> {
  constructor(props: any) {
    super(props)
    this.state = {
      base: '',
      date: '',
      rates: null
    }
  }

  componentWillMount() {
    getData().then(({data}) => {
      this.setState({
        base: data.base,
        date: data.date,
        rates: data.rates
      })
      console.log(this.state)
    })
  }

  render() {
    return (
      <div>
        content
      </div>
    )
  }


}