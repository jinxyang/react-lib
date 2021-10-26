import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'antd'

import styles from '../../styles'

const StyledSelectionCol = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ $indent }) => styles.getGap((1 - $indent) * -2)};
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  width: ${styles.getGap(2)};
  transform: translate(0, -50%);

  .ant-checkbox {
    top: 0;
  }
`

const TableSelectionCol = ({
  indent = 0,
  value = false,
  onChange = () => {},
}) => {
  return (
    <StyledSelectionCol $indent={indent}>
      <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
    </StyledSelectionCol>
  )
}

export default TableSelectionCol
