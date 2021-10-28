import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

const StyledSpace = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${styles.getGap()};
  align-items: flex-start;
`

const Space = ({ gap = 0.5, children, ...props }) => {
  return (
    <StyledSpace $gap={gap} {...props}>
      {children}
    </StyledSpace>
  )
}

export default Space
