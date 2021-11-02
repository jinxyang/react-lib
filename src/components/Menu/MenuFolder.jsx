import React from 'react'
import styled from 'styled-components'

import AntIcon from '../AntIcon'
import { StyledList, StyledItem } from './styled'

import styles from '../../styles'

const StyledTitle = styled.p`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.gap / 2 + 'px'};
  padding: ${({ theme }) => `0 ${theme.gapString}`};
  color: ${({ theme }) => theme.colors.transparent[6]};
  font-size: 0.95em;
  cursor: default;

  & + ${StyledList} {
    padding-left: ${styles.getGap(0.75)};
  }
`

const Gap = styled.span`
  padding: ${({ theme }) => theme.gap / 4 + 'px'};
`

const MenuFolder = ({ title = '', icon = '', children }) => {
  const arrayChildren = React.Children.toArray(children)
  return (
    <>
      <StyledTitle>
        {icon && <AntIcon name={icon} />}
        {icon && <Gap />}
        {title}
      </StyledTitle>
      <StyledList>
        {React.Children.map(arrayChildren, (child) => (
          <StyledItem>{child}</StyledItem>
        ))}
      </StyledList>
    </>
  )
}

export default MenuFolder
