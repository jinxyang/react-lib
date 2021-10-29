import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

const StyledTag = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${styles.getGap(0.15)} ${styles.getGap(0.5)};
  color: ${({ theme, $color }) =>
    $color ? theme.colors[$color].default : theme.font.color};
  background: ${({ theme, $color }) =>
    $color
      ? theme.darkMode
        ? theme.colors[$color].dark[5]
        : theme.colors[$color].light[1]
      : theme.colors.transparent[1]};
  border-radius: ${styles.getRadius(0.5)};
  cursor: ${({ $click }) => ($click ? 'pointer' : 'default')};
  user-select: none;

  &:hover {
    opacity: ${({ $loading, $disabled, $click }) =>
      $loading || $disabled || $click ? 0.8 : 1};
  }
`

const Tag = ({
  color = '',
  loading = false,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <StyledTag
      $color={color}
      $loading={loading}
      $disabled={disabled}
      $click={onClick}
      onClick={onClick || (() => {})}
    >
      {children}
    </StyledTag>
  )
}

export default Tag
