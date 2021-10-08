import React from 'react'
import styled from 'styled-components'

const positions = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

export const StyledCol = styled.div`
  display: flex;
  flex: ${({ $width }) => ($width ? '0 0 ' + $width + 'px' : 1)};
  justify-content: ${({ $align }) => positions[$align]};
  align-items: center;
  width: ${({ $width }) => ($width ? $width + 'px' : 'auto')};
  padding: ${({ theme }) => theme.gap / 2 + 'px'};
  overflow: hidden;
  text-align: ${({ $align }) => $align};
`

const TableCol = ({ align = 'left', width = 0, children }) => {
  return (
    <StyledCol $align={align} $width={width}>
      {children}
    </StyledCol>
  )
}

export default TableCol
