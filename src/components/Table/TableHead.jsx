import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

import TableCol, { StyledColInner } from './TableCol'

const StyledHead = styled.header`
  display: flex;
  flex: 0 0 auto;
  padding-left: ${({ $indent }) => ($indent ? styles.getGap(2) : 0)};
  font-weight: bold;
  cursor: default;
  user-select: none;

  & ${StyledColInner} {
    padding-top: 0;
    padding-bottom: 0;
    background: none;

    &:hover {
      background: none;
    }
  }
`

const TableHead = ({ columns = [], selected = false, onSelect = null }) => {
  return (
    <StyledHead $indent={!!onSelect}>
      {columns.map(({ label, align, width }, index) => (
        <TableCol
          key={index}
          align={align}
          width={width}
          isFirst={index === 0}
          selected={selected}
          onSelect={onSelect && ((v) => onSelect(null, v))}
        >
          {label}
        </TableCol>
      ))}
    </StyledHead>
  )
}

export default TableHead
