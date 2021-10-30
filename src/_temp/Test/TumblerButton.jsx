import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { blue } from '@ant-design/colors'

import { throttle } from 'utils'

const StyledWrap = styled.button`
  position: relative;
  padding: 0;
  color: inherit;
  font: inherit;
  background: none;
  border: none;
  transform-style: preserve-3d;
  perspective: 500;
  appearance: none;
`
const StyledBackground = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${blue.primary};
  transition: all 0.2s, transform 0.1s;

  ${StyledWrap}:hover & {
    background: ${blue[7]};
  }
`
const StyledText = styled.span`
  position: relative;
  z-index: 10;
  display: block;
  padding: 4px 16px;
  transition: all 0.1s;
`

const TumblerButton = ({ children = '' }) => {
  const ref = useRef(null)
  const [isOn, setOn] = useState(false)
  const [offset, setOffset] = useState([0, 0])

  const handleMove = throttle(({ clientX, clientY }) => {
    if (!isOn) return
    const el = ref.current
    const { top, left, width, height } = el.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    setOffset([Math.round(y - clientY), Math.round((clientX - x) * 0.3)])
  }, 100)

  const handleLeave = () => {
    setOn(false)
    setOffset([0, 0])
  }

  return (
    <StyledWrap
      ref={ref}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      <StyledBackground
        style={{
          transform: `rotateX(${offset[0]}deg) rotateY(${offset[1]}deg) `,
        }}
      />
      <StyledText
        style={{
          transform: `rotateX(${Math.round(
            offset[0] * 0.5,
          )}deg) rotateY(${Math.round(offset[1] * 0.5)}deg) translateZ(4px) `,
        }}
      >
        {children}
      </StyledText>
    </StyledWrap>
  )
}

export default TumblerButton
