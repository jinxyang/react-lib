import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'

const StyledWrap = styled.label`
  position: relative;
  display: flex;
  overflow: hidden;
`

const StyledLabel = styled.span`
  display: flex;
  align-items: center;
  padding-right: ${styles.getGap(0.5)};
  padding-left: ${styles.getGap()};
  background-color: ${({ theme }) => theme.colors.transparent[0]};
  border-radius: ${styles.getRadius(2)} ${styles.getRadius(0.5)}
    ${styles.getRadius(0.5)} ${styles.getRadius(2)};
`

const StyledContent = styled.div`
  margin-left: 3px;
`

const withFilter = (WrappedComponent) => {
  if (!WrappedComponent) return null
  const WrapperComponent = (
    {
      name = '',
      value = '',
      label = '',
      rules,
      showError,
      labelInline,
      labelWidth,
      labelLeft,
      hideLabel,
      onError = () => {},
      ...props
    },
    ref,
  ) => {
    return (
      <StyledWrap>
        <StyledLabel>{label}</StyledLabel>
        <StyledContent>
          <WrappedComponent ref={ref} name={name} value={value} {...props} />
        </StyledContent>
      </StyledWrap>
    )
  }
  return React.forwardRef(WrapperComponent)
}

export default withFilter
