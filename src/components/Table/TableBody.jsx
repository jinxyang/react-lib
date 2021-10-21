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
  border-radius: ${({ theme }) => theme.radiusString};
  content-visibility: auto;
`

const getRows = (list = [], props) => {
  return list.map((data, index) => [
    <TableRow {...props} data={data} key={index} />,
    data.children && getRows(data.children, props),
  ])
}

const TableBody = ({
  list = [],
  loading = false,
  onAction = () => {},
  ...props
}) => {
  return (
    <StyledBody>
      {do {
        if (list.length) {
          return getRows(list, { ...props, loading, onAction })
        } else if (loading) {
          return [{}, {}, {}].map((_, index) => (
            <Skeleton key={index} height="54px" duration="1.5s" />
          ))
        } else {
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      }}
      {/* {!loading && !list.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : loading && !list.length ? (
        [{}, {}, {}].map((_, index) => (
          <Skeleton key={index} height="54px" duration="1.5s" />
        ))
      ) : (
        getRows(list, { ...props, loading, onAction })
      )} */}
    </StyledBody>
  )
}

export default TableBody
