import React from 'react'
import styled from 'styled-components'

const StyledArrowIcon = styled.span`
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
  width: ${({ theme, $size }) => ($size || theme.size) + 'px'};
  height: ${({ theme, $size }) => ($size || theme.size) + 'px'};
  vertical-align: middle;
  transform: ${({ $rotate }) => `rotate(${$rotate}deg) `};

  /* transition: transform 150ms; */

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: ${({ $thickness }) => `calc(50% - (${$thickness / 2}px)) `};
    left: ${({ $thickness }) => `calc(50% - (${$thickness / 2}px)) `};
    width: ${({ $thickness }) => `calc(50% + (${$thickness / 2}px)) `};
    height: ${({ $thickness }) => $thickness + 'px'};
    background-color: ${({ theme, $color }) => $color || theme.font.color};
    border-radius: ${({ $thickness }) => $thickness / 2 + 'px'};
    transform-origin: ${({ $thickness }) => `${$thickness / 2}px center`};
    transition: transform 150ms;
  }

  &::before {
    transform: ${({ $angle }) => `rotate(${$angle - 90}deg) `};
  }

  &::after {
    z-index: 1;
    transform: ${({ $angle }) => `rotate(${90 - $angle}deg) `};
  }
`

const ArrowIcon = ({
  size = 0,
  rotate = 0,
  thickness = 1,
  color = '',
  angle = 30,
}) => {
  return (
    <StyledArrowIcon
      $size={size}
      $rotate={rotate}
      $thickness={thickness}
      $angle={angle}
      $color={color}
    />
  )
}

export default ArrowIcon
