import React from 'react'
import styled from 'styled-components'

const StyledFoot = styled.footer`
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-end;
`

const TableFoot = ({ children }) => {
  return <StyledFoot>{children}</StyledFoot>
}

export default TableFoot
