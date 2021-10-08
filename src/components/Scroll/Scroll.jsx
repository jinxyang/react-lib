import React from 'react'
import styled from 'styled-components'

const StyledScroll = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: ${({ $y }) => ($y ? 'scroll' : 'visible')};
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    /* width: 0; */
  }
`

const Scroll = ({ y = false, children }) => {
  return <StyledScroll $y={y}>{children}</StyledScroll>
}

export default Scroll
