import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

const StyledWrap = styled.ul`
  display: flex;
  flex: 0 0 auto;
  gap: ${styles.getGap(0.25)};
  align-items: center;
  margin: 0;
  padding: ${styles.getGap(0.25)};
  list-style: none;
  background-color: ${({ theme }) => theme.colors.transparent[1]};
  border-radius: ${styles.getRadius(0.75)};
  user-select: none;
`

const Tab = ({ value, onChange = () => {}, children }) => {
  const arrayChildren = React.Children.toArray(children)

  return (
    <StyledWrap>
      {React.Children.map(arrayChildren, (child, index) => {
        return React.cloneElement(child, {
          active: child.props.value === value,
          onClick: () => onChange(child.props.value),
        })
      })}
    </StyledWrap>
  )
}

export default Tab
