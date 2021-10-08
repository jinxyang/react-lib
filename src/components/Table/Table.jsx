import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Pagination } from 'antd'

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

const Table = ({
  vertical = false,
  columns = [],
  extraColumns = [],
  list = [],
  loading = false,
  background = false,
  pagination = null,
  onPageChange = () => {},
  history,
  children,
}) => {
  return (
    <StyledTable>
      {!vertical && <TableHead columns={columns} />}
      <TableBody
        vertical={vertical}
        columns={columns}
        extraColumns={extraColumns}
        list={list}
        loading={loading}
        background={background}
        history={history}
      />
      {!!list.length && !loading && (children || pagination) && (
        <TableFoot>
          {children || (
            <Pagination
              showTotal={(total) => `共：${total}`}
              {...pagination}
              onChange={onPageChange}
            />
          )}
        </TableFoot>
      )}
    </StyledTable>
  )
}

export default withRouter(Table)
