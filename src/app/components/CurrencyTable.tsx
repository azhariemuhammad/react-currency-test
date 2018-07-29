import * as React from 'react'
import { Card } from 'semantic-ui-react'

import { getData } from '../api'

// interface ICurrencyTableProps {
//   base: string
//   date: string
//   rates: any
// }

interface IState {
  baseNum: number
  initialValue: number
  defaultCurrency: Array<string>
  exchange: number
  base: string
  date: string
  rates: any
}

export class CurrencyTable extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      baseNum: 10000,
      initialValue: 0,
      defaultCurrency: ['EUR', 'GBP', 'SGD'],
      exchange: 0,
      base: '',
      date: '',
      rates: {}
      
    }
    this.getExchangeRate = this.getExchangeRate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  public componentWillMount() {
    getData().then(({data}) => {
      console.log(data)
      this.setState({
        base: data.base,
        date: data.date,
        rates: data.rates
      })
    })
  }
  shouldComponentUpdate(nextProps: any, nextState: any) {
    let shouldUpdate = this.state.exchange !== nextState.exchange;
    return shouldUpdate;
  }

  public getExchangeRate (rate: number): any {    
    const exchange = rate * this.state.baseNum
    this.setState({
      exchange: rate * this.state.baseNum
    })
    return this.state.exchange
  }

  public handleChange (event: any): any {
    this.setState({
      baseNum: event.target.value
    })
    
  }
  
  public render() {
    return (
      <Card.Group>
        <Card>
        <Card.Content>
          <Card.Header>USD-United States Dollars</Card.Header>
          <h2>USD</h2>
          <input type="text" placeholder="10.000" onChange={(e) => this.handleChange(e)}/>
          <Card.Content>
            {this.state.defaultCurrency.map((item: string, idx: number) =>
              <div key={idx} style={boxStyle}>
              <p>{item}</p>
              <p>{this.state.rates[item]}</p>
              <p>1 USD = {item} {this.state.rates[item]}</p>
              </div>  
            )}
          </Card.Content>
        </Card.Content>
      </Card>
      </Card.Group>
    )
  }
}

const boxStyle = {
  width: '100%',
  height: '75px',
  border: '1px solid black'
};