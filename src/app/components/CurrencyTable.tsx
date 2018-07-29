import * as React from 'react'
import { Card, Button } from 'semantic-ui-react'

import { getData } from '../api'
import dataCurrency from '../file.ts'

interface ICurrencyTableProps {
  base: string
  date: string
  rates: any
}

interface IcurrencySymbols {
  currency: string
  state: string
}

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
      defaultCurrency: ['IDR', 'EUR', 'GBP', 'SGD'],
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
    this.addNewcurrency = this.addNewcurrency.bind(this)
    this.removeCurrency = this.removeCurrency.bind(this)
    this.getCurrency = this.getCurrency.bind(this)
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

  public shouldComponentUpdate(nextProps: any, nextState: any) {
    let shouldUpdate1 = this.state.rates !== nextState.rates;
    let shouldUpdate2 = this.state.baseNum !== nextState.baseNum;
    let shouldUpdate3 = this.state.defaultCurrency !== nextState.defaultCurrency
    return shouldUpdate1 || shouldUpdate2 ||  shouldUpdate3
  }

  public getExchangeRate (rate: any): Number {
    let result: number
    if (typeof rate === 'undefined') {
      result =  1
    } else {
        result = rate * Number(this.state.baseNum)
    }
    
    return Math.round(result)
  }

  public handleChange (event: any): any {
    const target = event.target;
    const value = target.value
    const name = target.name;
    
    if (name === 'baseNum') {
      this.setState({
        baseNum: Number(value)
      })
    } else if (name === 'newCurrency') {
      this.setState({
        newCurrency: value
      })
    }
  }

  public removeCurrency(index: number, event: any): void {
    event.preventDefault()
    let currencies = [...this.state.defaultCurrency]
    currencies.splice(index, 1)
    this.setState({
      defaultCurrency: currencies
    })
  }

  public addNewcurrency() {
    this.setState({
      defaultCurrency: [...this.state.defaultCurrency, this.state.newCurrency],
    })
  }

  public getCurrency(value: string): string {
    const data: any = dataCurrency
    let res: string
    data.dataCurrency.map((item: IcurrencySymbols) => {
      if (item.currency == value) {
        res = item.state
      }
    })
    return res
  }

  public handleSubmit(event: any): void {
    this.addNewcurrency()
    event.preventDefault()
  }

  public render() {
    return (
      <Card.Group>
        <Card>
        <Card.Content>
          <Card.Header>USD-United States Dollars</Card.Header>
          <h2>USD</h2>
          <input type="text" name="baseNum" placeholder="10.000" onChange={this.handleChange}/>
          <Card.Content>
            {this.state.defaultCurrency.map((item: string, idx: number) =>
            <div style={boxStyle}>
              <div key={idx} style={left}>
              <div style={fooStyle}>
                <p>{item}</p>
                <p>{this.getExchangeRate(this.state.rates[item])}</p>
              </div>
                
                <p>{item} - {this.getCurrency(item)}</p>
                {Object.keys(this.state.rates).length > 0 && 
                  <p>1 USD = {item} {this.state.rates[item].toFixed(4)}</p>
                }
              </div>
                <div style={right}>
                <button onClick={(e) => this.removeCurrency(idx, e)}>X</button>
                </div>
              </div>  
            )}
          </Card.Content>
        </Card.Content>
        <form style={formStyle} onSubmit={this.handleSubmit}>
          <input list="currencies" name="newCurrency" onChange={this.handleChange} />
            <datalist id="currencies">
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
  display: 'flex',
  flexFlow: 'row wrap',
  width: '100%',
  height: '100px',
  border: '1px solid black'
};

const left = {
  width: '220px',
  borderRight: '1px solid'
}
const right = {
  alignSelf: 'center',
  marginLeft: '8px',
}

const formStyle = {
  marginLeft: '14px',
}

const fooStyle = {
  display: 'flex',
  justifyContent: 'space-between'
}
