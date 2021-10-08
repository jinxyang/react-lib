import React from 'react'
import styled, { css } from 'styled-components'

import StyledBlur from '../styled/StyledBlur'
import styles from '../../styles'

const fill = css`
  ${({ $fill }) => $fill && 'width: 100%'};
  ${({ $fill }) => $fill && 'height: 100%'};
`
const StyledApp = styled.div`
  ${fill};

  position: relative;
`

const StyledContent = styled.div`
  ${fill};

  position: relative;
  z-index: 1;
  padding: ${styles.getGap()};
`

const App = ({
  as = 'div',
  gap = 1,
  color = '',
  opacity = 1,
  fill = true,
  children,
}) => {
  return (
    <StyledApp as={as} $fill={fill}>
      <StyledBlur $color={color} $opacity={opacity} />
      <StyledContent $fill={fill} $gap={gap}>
        {children}
      </StyledContent>
    </StyledApp>
  )
}

export default App
