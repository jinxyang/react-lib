import React from 'react'
import styled from 'styled-components'

import TableCol, { StyledCol } from './TableCol'

const StyledHead = styled.header`
  display: flex;
  flex: 0 0 auto;
  gap: ${({ theme }) => theme.gap / 2 + 'px'};
  padding: 0 ${({ theme }) => theme.gap / 2 + 'px'};
  font-weight: bold;
  cursor: default;
  user-select: none;

  & > ${StyledCol} {
    padding-top: 0;
    padding-bottom: 0;

    &:hover {
      background-color: transparent;
    }
  }
`

const TableHead = ({ columns = [] }) => {
  return (
    <StyledHead>
      {columns.map(({ label, align, width }, index) => (
        <TableCol align={align} width={width} key={index}>
          {label}
        </TableCol>
      ))}
    </StyledHead>
  )
}

export default TableHead
