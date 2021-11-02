import React from 'react'
import styled from 'styled-components'

const StyledFoot = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-end;
`

const TableFoot = ({ as = 'footer', children }) => {
  return <StyledFoot as={as}>{children}</StyledFoot>
}

export default TableFoot
