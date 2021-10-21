import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

import TableCol from './TableCol'
import TableSelectionCol from './TableSelectionCol'
import TableVerticalCol, { StyledVerticalCol } from './TableVerticalCol'
import TableRowExtra from './TableRowExtra'

const StyledRow = styled.div`
  background-color: ${({ theme, $background }) =>
    $background ? theme.colors.transparent[0] : theme.foreground};
  border-radius: ${({ theme }) => theme.radiusString};
  transition: background-color 150ms;

  &:hover {
    background-color: ${({ theme, $background }) =>
      $background ? theme.colors.transparent[1] : theme.foregroundHover};
  }
`
const StyledInner = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? 'column' : 'row')};
  gap: ${styles.getGap(0.5)};
  width: 100%;
  padding: ${({ $vertical }) => styles.getGap($vertical ? 1 : 0.5)};
  overflow: hidden;

  & > ${StyledVerticalCol} {
    flex-direction: column;
  }
`

const TableRow = ({
  vertical = false,
  columns = [],
  extraColumns = [],
  data = {},
  background = false,
  loading = false,
  history = {},
  onSelect = null,
  onAction = () => {},
}) => {
  return (
    <StyledRow $background={background}>
      <StyledInner $vertical={vertical}>
        {onSelect && (
          <TableSelectionCol
            value={!!data.SELECTED}
            onChange={(v) => onSelect(data, v)}
          />
        )}
        {columns.map(({ label, key, render, align, width }, index) =>
          vertical ? (
            <TableVerticalCol key={index} label={label}>
              {render ? render(data, { history }, onAction) : data[key]}
            </TableVerticalCol>
          ) : (
            <TableCol key={index} align={align} width={width}>
              {render ? render(data, { history }, onAction) : data[key]}
            </TableCol>
          ),
        )}
      </StyledInner>
      {!loading && !!extraColumns.length && (
        <TableRowExtra
          columns={extraColumns}
          data={data}
          loading={loading}
          history={history}
          onAction={onAction}
        />
      )}
    </StyledRow>
  )
}

export default TableRow
