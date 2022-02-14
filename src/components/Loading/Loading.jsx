import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const StyledLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.transparent[5]};
`
const StyledInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 8px;
  background-color: ${({ theme }) => theme.colors.primary.default};
  border-radius: 20px;
`
const StyledSpin = styled.span`
  width: 24px;
  height: 24px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: ${spin} 500ms linear infinite;
`
const StyledText = styled.span`
  margin-left: 8px;
  color: #fff;
  font-weight: 500;
  font-size: 15px;
`

const Loading = ({ text }) => {
  const tiny = typeof text === 'string' && !!text
  console.log(tiny)
  return (
    <StyledLoading>
      <StyledInner $tiny={tiny}>
        <StyledSpin $tiny={tiny} />
        {tiny && <StyledText>{text}</StyledText>}
      </StyledInner>
    </StyledLoading>
  )
}

export default Loading
