import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

import styles from '../../styles'

import TableCol, { StyledColInner } from './TableCol'
import TableVerticalCol, { StyledVerticalCol } from './TableVerticalCol'
import TableRowExtra, { StyledExtraContent } from './TableRowExtra'

const StyledRow = styled.div`
  padding-left: ${({ $indent }) => ($indent ? styles.getGap(2) : 0)};

  &:hover {
    ${StyledColInner} {
      background-color: ${({ theme }) => theme.colors.transparent[1]};
    }

    ${StyledExtraContent} {
      background-color: ${({ theme }) => theme.colors.transparent[2]};
    }
  }
`
const StyledRowInner = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? 'column' : 'row')};
  width: 100%;
  padding: ${({ $vertical }) => ($vertical ? styles.getGap() : 0)};

  & > ${StyledVerticalCol} {
    flex-direction: column;
  }
`

const TableRow = ({
  vertical = false,
  list = [],
  columns = [],
  extraColumns = [],
  data = {},
  background = false,
  loading = false,
  history = {},
  indent = 0,
  utils = {},
  onSelect = null,
  onChange = () => {},
  onAction = () => {},
}) => {
  return (
    <StyledRow $background={background} $indent={!!onSelect}>
      <StyledRowInner $vertical={vertical}>
        {columns.map(({ label, key, render, align, width }, index) =>
          vertical ? (
            <TableVerticalCol
              key={index}
              label={label}
              isFirst={index === 0}
              isLast={index === columns.length - 1}
            >
              {render
                ? render(data, { ...utils, list, history, onChange }, onAction)
                : get(data, key)}
            </TableVerticalCol>
          ) : (
            <TableCol
              key={index}
              align={align}
              width={width}
              indent={index === 0 ? indent : 0}
              isFirst={index === 0}
              isLast={index === columns.length - 1}
              selected={!!data.SELECTED}
              onSelect={onSelect && ((v) => onSelect(data, v))}
            >
              {render
                ? render(data, { ...utils, list, history, onChange }, onAction)
                : get(data, key)}
            </TableCol>
          ),
        )}
      </StyledRowInner>
      {!loading && !!extraColumns.length && (
        <TableRowExtra
          columns={extraColumns}
          data={data}
          loading={loading}
          history={history}
          indent={indent}
          onAction={onAction}
        />
      )}
    </StyledRow>
  )
}

export default TableRow
