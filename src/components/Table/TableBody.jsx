import React from 'react'
import styled from 'styled-components'
import { Empty } from 'antd'
import { cloneDeep } from 'lodash'

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
      {!loading && !list.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        getRows(list.length ? list : [{}, {}, {}], {
          ...props,
          list: cloneDeep(list),
          loading,
        })
      )}
    </StyledBody>
  )
}

export default TableBody
