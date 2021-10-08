import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'
import { showAnimation } from './styles'

const StyledWrap = styled.li`
  ${showAnimation};

  display: flex;
  align-items: center;
  padding: 0 ${styles.getGap(0.5)};
  color: ${({ theme }) => theme.font.color};
  border-radius: ${styles.getRadius(0.5)};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  transition: background-color 150ms;
  animation-delay: 50ms;

  &:hover {
    background-color: ${({ theme, $disabled }) =>
      $disabled ? 'none' : theme.colors.transparent[1]};
  }
`

const BreadcrumbItem = ({
  isLast = false,
  disabled = false,
  onClick = () => {},
  children,
}) => {
  return (
    <StyledWrap
      $disabled={isLast || disabled}
      onClick={() => !isLast && !disabled && onClick()}
    >
      {children}
    </StyledWrap>
  )
}

export default BreadcrumbItem
