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
  overflow: hidden;
`

const getRows = (
  { uniqueKey, list, expandedKeys, onExpand },
  props = {},
  indent = 0,
) => {
  return list.map((data, index) => [
    <TableRow
      {...props}
      data={data}
      indent={indent}
      expanded={expandedKeys.includes(data[uniqueKey])}
      onExpand={!!data.children && onExpand}
      key={index}
    />,
    data.children &&
      expandedKeys.includes(data[uniqueKey]) &&
      getRows(
        { uniqueKey, list: data.children, expandedKeys, onExpand },
        props,
        indent + 1,
      ),
  ])
}

const TableBody = ({
  uniqueKey,
  list = [],
  loading = false,
  enableExpand = false,
  expandAll = false,
  ...props
}) => {
  const [expandedKeys, setExpandedKeys] = React.useState([])

  const handleExpand = (data) => {
    const key = data[uniqueKey]
    setExpandedKeys((keys) => {
      if (expandedKeys.includes(key)) {
        return keys.filter((k) => k !== key)
      }
      return [...keys, key]
    })
  }

  React.useEffect(() => {
    expandAll && setExpandedKeys(list.map((item) => item[uniqueKey]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledBody>
      {!loading && !list.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        getRows(
          {
            uniqueKey,
            list: list.length ? list : [{}, {}, {}],
            expandedKeys,
            onExpand: enableExpand && handleExpand,
          },
          {
            ...props,
            list: cloneDeep(list),
            loading,
          },
        )
      )}
    </StyledBody>
  )
}

export default TableBody
