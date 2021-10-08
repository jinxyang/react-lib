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
  user-select: none;
`

const Tag = ({ color = '', children, onClick = () => {} }) => {
  return (
    <StyledTag $color={color} onClick={onClick}>
      {children}
    </StyledTag>
  )
}

export default Tag
