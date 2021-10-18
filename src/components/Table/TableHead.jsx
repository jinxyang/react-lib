import React from 'react'
import styled from 'styled-components'

import TableCol, { StyledCol } from './TableCol'
import TableSelectionCol from './TableSelectionCol'

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

const TableHead = ({ columns = [], allSelected = false, onSelect = null }) => {
  return (
    <StyledHead>
      {onSelect && (
        <TableSelectionCol
          value={allSelected}
          onChange={(v) => onSelect(null, v)}
        />
      )}
      {columns.map(({ label, align, width }, index) => (
        <TableCol align={align} width={width} key={index}>
          {label}
        </TableCol>
      ))}
    </StyledHead>
  )
}

export default TableHead
