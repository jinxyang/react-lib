import React from 'react'
import styled, { withTheme } from 'styled-components'

import styles from '../../styles'

import TableSelectionCol from './TableSelectionCol'

const positions = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

export const StyledCol = styled.div`
  position: relative;
  display: flex;
  flex: ${({ $width }) => ($width ? '0 0 ' + $width + 'px' : 1)};
  align-items: center;
  width: ${({ $width }) => ($width ? $width + 'px' : 'auto')};
`
export const StyledColInner = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${({ $align }) => positions[$align]};
  align-items: center;
  height: 100%;
  margin-left: ${({ $indent }) => styles.getGap($indent * 2)};
  padding: ${styles.getGap(0.5)} ${styles.getGap(1)};
  text-align: ${({ $align }) => $align};
  background-color: ${({ theme }) => theme.colors.transparent[0]};
  border-radius: ${({ $radiusList }) => $radiusList.join(' ')};
  transition: background-color 150ms;
`

const TableCol = ({
  align = 'left',
  width = 0,
  indent = 0,
  isFirst = false,
  isLast = false,
  selected = false,
  onSelect = null,
  theme = {},
  children,
}) => {
  return (
    <StyledCol $width={width}>
      {isFirst && onSelect && (
        <TableSelectionCol
          indent={indent}
          value={selected}
          onChange={onSelect}
        />
      )}
      <StyledColInner
        $indent={indent}
        $align={align}
        $radiusList={[
          theme.radius * Number(isFirst) + 'px',
          theme.radius * Number(isLast) + 'px',
          theme.radius * Number(isLast) + 'px',
          theme.radius * Number(isFirst) + 'px',
        ]}
      >
        {children}
      </StyledColInner>
    </StyledCol>
  )
}

export default withTheme(TableCol)
