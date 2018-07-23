import * as React from 'react'
import { Menu } from 'semantic-ui-react'

const Header = (props: any) => {
  return (
    <div>
      <Menu>
        <Menu.Item name='Currency' />
      </Menu>
    </div>
  )
}

export default Header