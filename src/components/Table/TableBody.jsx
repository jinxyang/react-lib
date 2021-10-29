import React from 'react'
import styled from 'styled-components'
import { Empty } from 'antd'
import { cloneDeep } from 'lodash'

import { Skeleton } from '@jinxyang/react-lib'
import styles from '../../styles'
import TableRow from './TableRow'

const StyledBody = styled.section`
  display: grid;
  flex: 1;
  gap: ${styles.getGap(0.75)};
`

const getRows = (list = [], props, indent = 0) => {
  return list.map((data, index) => [
    <TableRow {...props} data={data} indent={indent} key={index} />,
    data.children && getRows(data.children, props, indent + 1),
  ])
}

const TableBody = ({ list = [], loading = false, ...props }) => {
  return (
    <StyledBody>
      {do {
        if (list.length) {
          return getRows(list, { ...props, list: cloneDeep(list), loading })
        } else if (loading) {
          return [{}, {}, {}].map((_, index) => (
            <Skeleton key={index} height="54px" duration="1.5s" />
          ))
        } else {
          return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      }}
    </StyledBody>
  )
}

export default TableBody
