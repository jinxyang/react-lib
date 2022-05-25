import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import TableTools from './TableTools'
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
  name = '',
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
  align = null,
  onListChange = () => {},
  onPageChange = () => {},
  onAction = () => {},
  sort = null,
  tools = { export: ['sheet'] },
  children,
}) => {
  const [currentSort, setCurrentSort] = React.useState(null)

  const sortList = React.useMemo(() => {
    return sort && currentSort
      ? _.orderBy(
          list,
          (item) => _.get(item, currentSort.key),
          currentSort.order,
        )
      : list
  }, [currentSort, list, sort])

  const selected = React.useMemo(
    () => (list.length ? list.every(({ SELECTED }) => !!SELECTED) : false),
    [list],
  )

  return (
    <StyledTable style={style}>
      {tools && (
        <TableTools name={name} list={list} columns={columns} tools={tools} />
      )}
      {/* {pagination && showMiniPagination && (
        <TableFoot as="div">
          <Pagination
            showTotal={showTotal}
            {...pagination}
            mode="mini"
            onChange={onPageChange}
          />
        </TableFoot>
      )} */}
      {!vertical && (
        <TableHead
          sort={sort}
          currentSort={currentSort}
          columns={columns}
          selected={selected}
          disabledSelect={disabledSelection(null)}
          onSelect={onSelect}
          onSort={setCurrentSort}
        />
      )}
      <TableBody
        uniqueKey={uniqueKey}
        align={align}
        vertical={vertical}
        columns={columns}
        extraColumns={extraColumns}
        list={sortList}
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
      {!!sortList.length &&
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
