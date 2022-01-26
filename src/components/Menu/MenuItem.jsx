import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'
import AntIcon from '../AntIcon'

const StyledLink = styled.a`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: ${styles.getGap(0.4)} ${styles.getGap()};
  color: ${({ theme, $active }) => ($active ? '#fff' : theme.font.color)};
  white-space: nowrap;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.default : 'transparent'};
  border-radius: ${({ theme }) => theme.radius / 2 + 'px'};
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};
  transition: all 150ms;
  user-select: none;

  &:hover {
    color: ${({ theme, $active }) => ($active ? '#fff' : theme.font.color)};
    background-color: ${({ $active, theme }) =>
      $active
        ? theme.colors.primary.default
        : theme.darkMode
        ? theme.colors.transparent[1]
        : theme.colors.transparent[0]};
  }
`

const Gap = styled.span`
  padding: 0 ${styles.getGap(0.25)};
`

const MenuItem = ({
  active = false,
  icon = '',
  onClick = () => {},
  children,
}) => {
  return (
    <StyledLink $active={active} onClick={onClick}>
      {icon && <AntIcon name={icon} style={{ fontSize: '1.2em' }} />}
      {icon && <Gap />}
      {children}
    </StyledLink>
  )
}

export default MenuItem
