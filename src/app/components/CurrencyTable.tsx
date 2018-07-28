import * as React from 'react'
import { Card } from 'semantic-ui-react'

interface ICurrencyTableProps {
  base: string
  date: string
  rates: any
}

const defaultCurrency: any = ['EUR', 'GBP', 'SGD']

export const CurrencyTable = (props: ICurrencyTableProps) => {
  const base = 10000

  const getExchangeRate = (rate: any) => {
    return rate * base
  }



  const listCurrencies = defaultCurrency.map((item: string, idx: number) =>  
    <div style={boxStyle}>
      <p>{item}</p>
      <p>{getExchangeRate(props.rates[item])}</p>
      <p>1 USD = {item} {props.rates[item]}</p>
    </div>
  )
  
  return (
    <Card.Group>
      <Card>
      <Card.Content>
        <Card.Header>USD-United States Dollars</Card.Header>
        <Card.Meta> {props.base} - {base} </Card.Meta>
        <Card.Content>
          {listCurrencies}
        </Card.Content>
      </Card.Content>
    </Card>
    </Card.Group>
  )
}

const boxStyle = {
  width: '100%',
  height: '75px',
  border: '1px solid black'
};