import React from 'react'

import { StyledList, StyledItem } from './styled'

const Menu = ({ children }) => {
  const arrayChildren = React.Children.toArray(children)
  return (
    <StyledList>
      {React.Children.map(arrayChildren, (child) => (
        <StyledItem>{child}</StyledItem>
      ))}
    </StyledList>
  )
}

export default Menu
