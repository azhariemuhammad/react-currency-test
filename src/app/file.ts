interface IcurrencySymbols {
  currency: string
  state: string
}

const dataCurrency: Array<IcurrencySymbols>  = [
  {
    "currency": "GBP",
    "state": "British-Pound"
  },
  {
    "currency": "IDR",
    "state": "Indonesian Rupiah"
  },
  {
    "currency": "EUR",
    "state": "Euro"
  },
  {
    "currency": "SGD",
    "state": "Singapore Dollar"
  },
  {
    "currency": "JPY",
    "state": "Jappanese Yen"
  },
  {
    "currency": "CAD",
    "state": "Canadian Dollar"
  },
  {
    "currency": "CHF",
    "state": "Swiss Franc"
  },
  {
    "currency": "INR",
    "state": "Indian Rupee"
  },
  {
    "currency": "MYR",
    "state": "Malaysian Ringgit"
  },
  {
    "currency": "KRW",
    "state": "South korean Won"
  }
]

export default {dataCurrency}