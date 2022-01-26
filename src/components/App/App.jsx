import React from 'react'
import styled, { css } from 'styled-components'
import { RedoOutlined } from '@ant-design/icons'

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
const StyledLoading = styled.div`
  ${styles.center};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.transparent[2]};
  border-radius: ${styles.getRadius()};
`

const App = ({
  as = 'div',
  gap = 1,
  color = '',
  opacity = 1,
  fill = true,
  loading = false,
  children,
  ...props
}) => {
  return (
    <StyledApp as={as} $fill={fill} {...props}>
      <StyledBlur $color={color} $opacity={opacity} />
      <StyledContent $fill={fill} $gap={gap}>
        {children}
      </StyledContent>
      {loading && (
        <StyledLoading>
          <RedoOutlined spin />
        </StyledLoading>
      )}
    </StyledApp>
  )
}

export default App
