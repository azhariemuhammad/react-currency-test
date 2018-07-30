import * as React from 'react';
import { shallow } from 'enzyme';

import { CurrencyTable } from '../app/components/CurrencyTable';

let wrapper: any;

beforeEach(() => {
  wrapper = shallow(<CurrencyTable />
  )
})

describe('CurrencyTable', () => {
  it('should render without error', () => {
    expect(wrapper.length).toBe(1)
  })  
  // it('should handle the click event', () => {
  //   const mockCallBack = jest.fn();
  //   currencyTable.find('button').simulate('click')
  //   expect(mockCallBack.mock.calls.length).toEqual(1);
  // })
  it('currency format instance equals 13,643 ', () => {
    expect(wrapper.instance().currencyFormatter(13643)).toEqual('13,643');
  })
  it('should update the component', () => {
    const arrDefaultCurrency = wrapper.state().defaultCurrency
    const mockArr = [...arrDefaultCurrency, 'IDR']
    const mockNextProps = ""
    expect(wrapper.instance().shouldComponentUpdate(mockNextProps, mockArr)).toBe(true)
  })
})

