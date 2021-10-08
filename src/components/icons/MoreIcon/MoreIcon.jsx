import React from 'react'
import styled from 'styled-components'

const getShadow = (s, color, minus = false) => {
  const size = s / 2 - s * 0.2 + 'px'
  return `${minus ? '-' : ''}${size} 0 ${color}`
}

const StyledMoreIcon = styled.span`
  position: relative;
  display: inline-block;
  width: ${({ theme, $size }) => ($size || theme.size) + 'px'};
  height: ${({ theme, $size }) => ($size || theme.size) + 'px'};

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${({ theme, $size }) =>
      Math.floor(($size || theme.size) * 0.2) + 'px'};
    height: ${({ theme, $size }) =>
      Math.floor(($size || theme.size) * 0.2) + 'px'};
    background-color: ${({ theme, $color }) => $color || theme.font.color};
    border-radius: 50%;
    content: '';
    box-shadow: ${({ theme, $size, $color }) =>
      getShadow(
        Math.floor($size || theme.size),
        $color || theme.font.color,
        true,
      ) +
      ',' +
      getShadow(Math.floor($size || theme.size), $color || theme.font.color)};
    transform: translate(-50%, -50%);
  }
`

const MoreIcon = ({ size = 0, color = '' }) => {
  return <StyledMoreIcon $size={size} />
}

export default MoreIcon
