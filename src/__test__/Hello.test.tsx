import * as React from 'react';
import { shallow } from 'enzyme';

import { Layout } from '../app/Layout/Layout';

let layout: any;

beforeEach(() => {
  layout = shallow(<Layout
      compiler="typescript"
      framework="react"
      bundler="webpack"
    />
  )
})

it('should render without error', () => {
  expect(layout.length).toBe(1)
})