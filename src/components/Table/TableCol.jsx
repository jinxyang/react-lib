import React from 'react'
import styled, { withTheme } from 'styled-components'
import _ from 'lodash'

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
  flex: ${({ $width, $flex }) =>
    $flex || ($width ? '0 0 ' + $width + 'px' : 1)};
  align-items: center;
  width: ${({ $width }) => ($width ? $width + 'px' : 'auto')};
  overflow: ${({ $isFirst, isSelect }) =>
    $isFirst && isSelect ? 'unset' : 'hidden'};
`
export const StyledColInner = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${({ $align }) => positions[$align]};
  align-items: center;
  height: 100%;
  margin-left: ${({ $indent }) => styles.getGap($indent * 2)};
  padding: ${styles.getGap(0.25)} ${styles.getGap(0.5)};
  overflow: hidden;
  text-align: ${({ $align }) => $align};
  word-break: break-all;
  background-color: ${({ theme }) => theme.colors.transparent[0]};
  border-radius: ${({ $radiusList }) => $radiusList.join(' ')};
  transition: background-color 150ms;
`

const TableCol = ({
  align = 'left',
  width = 0,
  flex = null,
  indent = 0,
  isFirst = false,
  isLast = false,
  selected = false,
  onSelect = null,
  disabledSelect = false,
  theme = {},
  children,
}) => {
  return (
    <StyledCol
      $isFirst={isFirst}
      isSelect={!!onSelect}
      $width={width}
      $flex={flex}
    >
      {isFirst && onSelect && (
        <TableSelectionCol
          indent={indent}
          value={selected}
          disabled={disabledSelect}
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
        {React.isValidElement(children) ? (
          children
        ) : (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={
              _.isArray(children)
                ? _.isObject(children[1])
                  ? ''
                  : children[1]
                : children
            }
          >
            {children}
          </div>
        )}
      </StyledColInner>
    </StyledCol>
  )
}

export default withTheme(TableCol)
