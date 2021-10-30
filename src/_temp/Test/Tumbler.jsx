import React, { useRef, useState, useMemo } from 'react'
import styled from 'styled-components'

import { throttle } from 'utils'

const StyledWrap = styled.div`
  display: inline-block;
  transform-style: preserve-3d;
  perspective: 500;
`
const StyledInner = styled.span`
  display: inline-block;
  transition: all 0.2s, transform 0.1s;
`

const Tumbler = ({ rotate = 1, children = '' }) => {
  const ref = useRef(null)
  const [offset, setOffset] = useState([0, 0])

  const [rotateX, rotateY] = useMemo(() => {
    return Array.isArray(rotate) ? rotate : [rotate, rotate]
  }, [rotate])

  const handleMove = throttle(({ clientX, clientY }) => {
    const el = ref.current
    const { x, y, width, height } = el.getBoundingClientRect()
    setOffset([
      Math.round((y + height / 2 - clientY) * rotateX),
      Math.round((clientX - (x + width / 2)) * rotateY),
    ])
  }, 100)

  const handleLeave = () => {
    setOffset([0, 0])
  }

  return (
    <StyledWrap ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <StyledInner
        style={{
          transform: `rotateX(${Math.round(offset[0])}deg) rotateY(${Math.round(
            offset[1],
          )}deg)`,
        }}
      >
        {children}
      </StyledInner>
    </StyledWrap>
  )
}

export default Tumbler
