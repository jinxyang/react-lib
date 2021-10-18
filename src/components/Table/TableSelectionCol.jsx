import React from 'react'
import styled from 'styled-components'

import Checkbox from '../Checkbox'

import styles from '../../styles'

const StyledCol = styled.div`
  display: flex;
  align-items: center;
  padding: ${styles.getGap(0.5)};
`

const TableSelectionCol = ({ value = false, onChange = () => {} }) => {
  return (
    <StyledCol>
      <Checkbox value={value} onChange={onChange} />
    </StyledCol>
  )
}

export default TableSelectionCol
