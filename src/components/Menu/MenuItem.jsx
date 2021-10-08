import React from 'react'
import styled from 'styled-components'

const StyledLink = styled.a`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.gap / 2}px ${theme.gapString}`};
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
  padding: 0 ${({ theme }) => theme.gap / 2 + 'px'};
`

const MenuItem = ({
  active = false,
  icon = '',
  onClick = () => {},
  children,
}) => {
  return (
    <StyledLink $active={active} onClick={onClick}>
      {icon}
      {icon && <Gap />}
      {children}
    </StyledLink>
  )
}

export default MenuItem
