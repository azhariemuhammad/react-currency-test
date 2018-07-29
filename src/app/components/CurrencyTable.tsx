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
  moreCurrencies: Array<string>
  exchange: number
  base: string
  date: string
  rates: any,
  newCurrency: string
}

export class CurrencyTable extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      baseNum: 10000,
      initialValue: 0,
      defaultCurrency: ['EUR', 'GBP', 'SGD'],
      moreCurrencies: [
        'CAD',
        'IDR',
        'GBP',
        'CHF',
        'INR',
        'MYR',
        'JPY',
        'KRW'
      ],
      exchange: 0,
      base: '',
      date: '',
      rates: {},
      newCurrency: ''
      
    }
    this.getExchangeRate = this.getExchangeRate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputNewCurrency = this.handleInputNewCurrency.bind(this)
    this.addNewcurrency = this.addNewcurrency.bind(this)
  }

  public componentDidMount() {
    getData().then(({data}) => {
      this.setState({
        base: data.base,
        date: data.date,
        rates: data.rates
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  shouldComponentUpdate(nextProps: any, nextState: any) {
    let shouldUpdate1 = this.state.rates !== nextState.rates;
    let shouldUpdate2 = this.state.baseNum !== nextState.baseNum;
    let shouldUpdate3 = this.state.defaultCurrency !== nextState.defaultCurrency
    return shouldUpdate1 || shouldUpdate2 ||  shouldUpdate3
  }

  public getExchangeRate (rate: any): any {
    let result: number
    if (typeof rate === 'undefined') {
      result =  1
    } else {
        result = rate * Number(this.state.baseNum)
    }
    
    return result
  }

  public handleChange (event: any): any {
    this.setState({
      baseNum: event.target.value
    })
  }

  public handleInputNewCurrency(event: any): any {
    this.setState({
      newCurrency: event.target.value
    })
  }

  public addNewcurrency() {
    this.setState({
      defaultCurrency: [...this.state.defaultCurrency, this.state.newCurrency],
    })
    // console.log([...this.state.defaultCurrency, this.state.newCurrency])
    console.log(this.state.moreCurrencies);
    
  }

  public handleSubmit(event: any): any {
    console.log(this.state.newCurrency)
    this.addNewcurrency()
    event.preventDefault()
  }
  public render() {
    console.log(this.state)
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
              <p>{this.getExchangeRate(this.state.rates[item])}</p>
              <p>1 USD = {item} {this.state.rates[item]}</p>
              </div>  
            )}
          </Card.Content>
        </Card.Content>
        <form onSubmit={this.handleSubmit}>
          <input list="browsers" name="myBrowser" onChange={(e) => this.handleInputNewCurrency(e)} />
            <datalist id="browsers">
            {this.state.moreCurrencies.map((item: string, idx:number) => 
                <option key={idx} value={item} />
            )}
            </datalist>
            <input type="submit" value="+" />
        </form>
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