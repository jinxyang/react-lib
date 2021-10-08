import React from 'react'
import styled from 'styled-components'

const StyledSquare = styled.div`
  position: relative;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`
const StyledContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Square = ({ as = 'div', children }) => {
  return (
    <StyledSquare as={as}>
      <StyledContent>{children}</StyledContent>
    </StyledSquare>
  )
}

export default Square
