import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

const StyledItem = styled.li`
  padding: ${styles.getGap(0.25)} ${styles.getGap(1)};
  color: ${({ theme, $active }) => ($active ? '#fff' : 'inherit')};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.default : 'transparent'};
  border-radius: ${styles.getRadius(0.5)};
  cursor: default;
  transition: all 150ms;
`

const TabItem = ({ active = false, onClick = () => {}, children }) => {
  return (
    <StyledItem $active={active} onClick={onClick}>
      {children}
    </StyledItem>
  )
}

export default TabItem
