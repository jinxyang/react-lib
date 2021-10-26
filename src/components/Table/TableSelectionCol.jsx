import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'antd'

import styles from '../../styles'

const StyledCol = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  padding: ${styles.getGap(0.5)};
`

const TableSelectionCol = ({ value = false, onChange = () => {} }) => {
  return (
    <StyledCol>
      <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)} />
    </StyledCol>
  )
}

export default TableSelectionCol
