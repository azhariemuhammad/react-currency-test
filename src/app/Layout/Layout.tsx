import * as React from 'react';

import Header from './Header'
import Content from './Content';

const Layout = (props: any) => {
    return( 
      <div>
        <Header />
        <Content />
      </div>
    )
}

export default Layout