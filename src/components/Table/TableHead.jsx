import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

import { Flex } from '@jinxyang/seal-react'

import styles from '../../styles'
import TableCol, { StyledColInner } from './TableCol'

const defaultStickyStyle = {
  position: 'sticky',
  top: '-6px',
  backgroundColor: 'rgba(150, 150, 150,0.2)',
  zIndex: 10,
  padding: '10px 0px 10px',
  borderRadius: '10px',
  backdropFilter: 'blur(6px)',
}

const StyledHead = styled.header`
  display: flex;
  flex: 0 0 auto;
  padding-left: ${({ $indent }) => ($indent ? styles.getGap(2) : 0)};
  font-weight: bold;
  cursor: default;
  user-select: none;

  & ${StyledColInner} {
    padding-top: 0;
    padding-bottom: 0;
    background: none;

    &:hover {
      background: none;
    }
  }
`

const SortArrow = ({ active = false, order = 'asc', onClick = () => {} }) => {
  return (
    <Flex
      direction="column"
      main="center"
      cross="center"
      gap={0}
      styles={{
        margin: [0, '-6px', 0, '4px'],
        fontSize: '0.8em',
        transition: 'all .3s',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <CaretUpOutlined
        style={{ opacity: active && order === 'asc' ? 1 : 0.3 }}
      />
      <CaretDownOutlined
        style={{
          opacity: active && order === 'desc' ? 1 : 0.3,
          marginTop: '-0.3em',
        }}
      />
    </Flex>
  )
}

const getSortArrow = (sort, key, sortKey, order, onClick) => {
  if (
    (_.isArray(sort) && _.includes(sort, key)) ||
    sort === 1 ||
    sort === true
  ) {
    return (
      <SortArrow
        active={sortKey === key}
        order={order}
        onClick={() =>
          onClick({
            key,
            order: sortKey === key && order === 'asc' ? 'desc' : 'asc',
          })
        }
      />
    )
  }
  return null
}

const TableHead = ({
  sticky = true,
  stickyStyle: customStickyStyle = {},
  columns = [],
  selected = false,
  disabledSelect = false,
  onSelect = null,
  sort = null,
  currentSort = null,
  onSort = () => {},
}) => {
  const stickyStyle = React.useMemo(() => {
    return sticky
      ? {
          ...defaultStickyStyle,
          ...customStickyStyle,
        }
      : {}
  }, [customStickyStyle, sticky])

  return (
    <StyledHead $indent={!!onSelect} style={stickyStyle}>
      {columns.map(({ key, label, align = 'center', width, flex }, index) => (
        <TableCol
          key={index}
          align={align}
          width={width}
          flex={flex}
          isFirst={index === 0}
          selected={selected}
          onSelect={onSelect && ((v) => onSelect(null, v))}
          disabledSelect={disabledSelect}
          append={getSortArrow(
            sort,
            key,
            currentSort?.key,
            currentSort?.order,
            onSort,
          )}
        >
          {label}
        </TableCol>
      ))}
    </StyledHead>
  )
}

export default TableHead
