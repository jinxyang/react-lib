import React from 'react'
import styled from 'styled-components'
import { Empty } from 'antd'

import { Skeleton } from '@jinxyang/react-lib'
import styles from '../../styles'
import TableRow from './TableRow'

const StyledBody = styled.section`
  display: grid;
  flex: 1;
  gap: ${styles.getGap(0.75)};

  /* overflow-y: scroll; */
  border-radius: ${({ theme }) => theme.radiusString};
  content-visibility: auto;
`

const TableBody = ({
  vertical = false,
  columns = [],
  extraColumns = [],
  list = [],
  loading = false,
  background = false,
  history = {},
  onSelect = null,
  onAction = () => {},
}) => {
  return (
    <StyledBody>
      {!loading && !list.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        (loading && !list.length ? [{}, {}, {}] : list).map((item, index) =>
          !loading ? (
            <TableRow
              vertical={vertical}
              columns={columns}
              extraColumns={extraColumns}
              data={item}
              background={background}
              loading={loading}
              history={history}
              onSelect={onSelect}
              onAction={onAction}
              key={index}
            />
          ) : (
            <Skeleton key={index} height="54px" duration="1.5s" />
          ),
        )
      )}
    </StyledBody>
  )
}

export default TableBody
