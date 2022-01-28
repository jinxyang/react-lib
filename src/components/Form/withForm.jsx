import React from 'react'
import styled from 'styled-components'

import defaultValidator from '../../utils/validator'

const StyledWrap = styled.label`
  position: relative;
  display: flex;
  flex-direction: ${({ $labelInline }) => ($labelInline ? 'row' : 'column')};
  overflow: visible;
`
const StyledHeader = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: flex-start;
  margin-right: ${({ theme }) => theme.gapString};
  padding-top: 5px;
  padding-bottom: ${({ $labelInline }) => ($labelInline ? 0 : '6px')};
`
const StyledLabel = styled.span`
  position: relative;
  display: flex;
  justify-content: ${({ $labelLeft }) =>
    $labelLeft ? 'flex-start' : 'flex-end'};
  align-items: center;
  width: ${({ $labelInline, $labelWidth }) =>
    $labelInline ? $labelWidth : 'auto'};
  overflow: hidden;
  color: ${({ theme }) => theme.font.color};

  span {
    position: relative;
    top: 4px;
    margin-right: 4px;
    color: ${({ theme }) => theme.colors.red.default};
    font-size: 1.4em;
    font-family: SimSun, sans-serif;
    line-height: 1;
  }
`
const StyledContent = styled.div`
  flex: 1;
`
const StyledFooter = styled.div`
  position: absolute;
  top: 100%;
  display: flex;
  flex: 1;
  align-items: flex-end;
  padding-top: 2px;
`
const StyledMessage = styled.p`
  margin: 0;
  color: #ff4d4f;
  font-size: 0.9em;
`

const withForm = (WrappedComponent) => {
  if (!WrappedComponent) return null
  const WrapperComponent = (
    {
      as = 'span',
      name = '',
      value = '',
      label = '',
      rules = [],
      showError = false,
      labelInline = true,
      labelWidth = '70px',
      labelLeft = false,
      hideLabel = false,
      style = {},
      onError = () => {},
      validator = defaultValidator,
      ...props
    },
    ref,
  ) => {
    const errorMessage = React.useMemo(
      () => validator?.(value, rules),
      [validator, value, rules],
    )

    const required = React.useMemo(
      () => !!rules.find(({ required }) => required),
      [rules],
    )

    React.useEffect(() => {
      onError(errorMessage || undefined)
    }, [errorMessage, onError])

    return (
      <StyledWrap $labelInline={labelInline} as={as}>
        {!hideLabel && (
          <StyledHeader $labelInline={labelInline}>
            <StyledLabel
              $labelInline={labelInline}
              $labelWidth={labelWidth}
              $labelLeft={labelLeft}
            >
              {required && <span>*</span>}
              {label}
            </StyledLabel>
          </StyledHeader>
        )}
        <StyledContent>
          <WrappedComponent
            ref={ref}
            name={name}
            value={value}
            style={{ ...style, width: '100%' }}
            onError={onError}
            {...props}
          />
          <StyledFooter>
            {showError && errorMessage && (
              <StyledMessage>{errorMessage}</StyledMessage>
            )}
          </StyledFooter>
        </StyledContent>
      </StyledWrap>
    )
  }
  return React.forwardRef(WrapperComponent)
}

export default withForm
