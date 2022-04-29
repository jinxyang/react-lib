import React from 'react'
import styled from 'styled-components'

const StyledSquare = styled.div`
  position: relative;
  width: ${({ $width }) => $width};

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

const Square = ({ as = 'div', width = '100%', children, ...props }) => {
  return (
    <StyledSquare $width={width} as={as} {...props}>
      <StyledContent>{children}</StyledContent>
    </StyledSquare>
  )
}

export default Square
