import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

export const StyledVerticalCol = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${styles.getGap(0.5)};
  align-items: flex-start;
`
export const StyledTitle = styled.p`
  margin: 0;
  font-weight: bold;
  white-space: nowrap;
`

const TableCol = ({ label = '', children }) => {
  return (
    <StyledVerticalCol>
      <StyledTitle>{label}</StyledTitle>
      {children}
    </StyledVerticalCol>
  )
}

export default TableCol
