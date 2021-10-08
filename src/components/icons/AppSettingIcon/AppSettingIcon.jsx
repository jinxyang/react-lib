import React from 'react'
import styled from 'styled-components'

const getColor = (theme, color) => {
  if (color === 'normal') return theme.font.color
  return theme.colors[color].default
}

const StyledAppSettingIcon = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1px;
  width: ${({ $size }) => $size + 'px'};
  height: ${({ $size }) => $size + 'px'};
  padding: 1px;
`
const StyledApp = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme, $color }) => getColor(theme, $color)};
  border-radius: 2px;
`

const AppSettingIcon = ({ size = 15, color = 'normal' }) => {
  return (
    <StyledAppSettingIcon $size={size}>
      <span>
        <StyledApp $color={color} />
      </span>
      <span>
        <StyledApp $color={color} />
      </span>
      <span>
        <StyledApp $color={color} />
      </span>
      <span>
        <StyledApp $color={color} />
      </span>
    </StyledAppSettingIcon>
  )
}

export default AppSettingIcon
