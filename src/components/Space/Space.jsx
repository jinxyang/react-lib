import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

const StyledSpace = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${styles.getGap()};
  align-items: flex-start;
`

const Space = ({ gap = 0.5, children }) => {
  return <StyledSpace $gap={gap}>{children}</StyledSpace>
}

export default Space
