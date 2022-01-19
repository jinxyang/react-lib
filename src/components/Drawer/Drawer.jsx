import React from 'react'
import styled from 'styled-components'

import Scroll from '../Scroll'

const StyledDrawer = styled.div`
  width: 100%;
  height: 100%;
`

const Drawer = ({
  show = false,
  inside = false,
  position = 'left',
  children,
}) => {
  return (
    <StyledDrawer>
      <Scroll y={true}>{children}</Scroll>
    </StyledDrawer>
  )
}

export default Drawer
