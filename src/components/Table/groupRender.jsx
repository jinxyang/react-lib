import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'
import TableVerticalCol, { StyledTitle } from './TableVerticalCol'

const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${styles.getGap(0.25)};

  & ${StyledTitle} {
    font-weight: normal;

    &::after {
      content: ': ';
    }
  }
`

const TableColGroup = ({ data = {}, list = [], utils = {} }) => {
  return (
    <StyledGroup>
      {list.map(({ label, key, render }, index) => (
        <TableVerticalCol key={index} label={label}>
          {render ? render(data, utils) : data[key]}
        </TableVerticalCol>
      ))}
    </StyledGroup>
  )
}

const groupRender =
  (list = [], options = {}) =>
  (data, utils = {}) => {
    return (
      <TableColGroup data={data} list={list} utils={utils} options={options} />
    )
  }

export default groupRender
