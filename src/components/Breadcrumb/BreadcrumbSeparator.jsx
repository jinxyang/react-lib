import React from 'react'
import styled from 'styled-components'

import ArrowIcon from '../icons/ArrowIcon'
import styles from '../../styles'
import { showAnimation } from './styles'

const StyledWrap = styled.li`
  ${showAnimation};

  display: flex;
  align-items: center;
  padding: 0 ${styles.getGap(0.25)};
  transform: translate(0, 0);
  animation-duration: 200ms;
`
const BreadcrumbSeparator = () => {
  return (
    <StyledWrap>
      <ArrowIcon size={10} angle={-30} thickness={2} />
    </StyledWrap>
  )
}

export default BreadcrumbSeparator
