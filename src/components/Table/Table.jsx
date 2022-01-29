import React from 'react'
import styled from 'styled-components'

import Pagination from '../Pagination'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableFoot from './TableFoot'

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap / 2 + 'px'};
  height: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.font.color};
  transition: color 150ms;
`

const showTotal = (total) => `共：${total}条`

const Table = ({
  uniqueKey = 'id',
  vertical = false,
  columns = [],
  extraColumns = [],
  list = [],
  loading = false,
  background = false,
  pagination = null,
  showMiniPagination = false,
  onSelect = null,
  disabledSelection = () => false,
  style = {},
  utils = {},
  enableExpand = true,
  expandAll = false,
  onListChange = () => {},
  onPageChange = () => {},
  onAction = () => {},
  children,
}) => {
  const selected = React.useMemo(
    () => (list.length ? list.every(({ SELECTED }) => !!SELECTED) : false),
    [list],
  )

  return (
    <StyledTable style={style}>
      {pagination && showMiniPagination && (
        <TableFoot as="div">
          <Pagination
            showTotal={showTotal}
            {...pagination}
            mode="mini"
            onChange={onPageChange}
          />
        </TableFoot>
      )}
      {!vertical && (
        <TableHead
          columns={columns}
          selected={selected}
          disabledSelect={disabledSelection(null)}
          onSelect={onSelect}
        />
      )}
      <TableBody
        uniqueKey={uniqueKey}
        vertical={vertical}
        columns={columns}
        extraColumns={extraColumns}
        list={list}
        loading={loading}
        background={background}
        utils={utils}
        enableExpand={enableExpand}
        expandAll={expandAll}
        onSelect={onSelect}
        disabledSelection={disabledSelection}
        onChange={onListChange}
        onAction={onAction}
      />
      {!!list.length &&
        !loading &&
        (children ||
          (pagination && (
            <TableFoot>
              <Pagination
                showTotal={showTotal}
                {...pagination}
                onChange={onPageChange}
              />
            </TableFoot>
          )))}
    </StyledTable>
  )
}

export default Table
