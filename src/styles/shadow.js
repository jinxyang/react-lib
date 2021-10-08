import { css } from 'styled-components'

const shadowColor = (darkMode, color) => {
  if (darkMode) return 'rgba(0 0 0 / 20%)'
  return color ? 'rgba(0 0 0 / 10%)' : 'rgba(0 0 0 / 5%)'
}

export default css`
  box-shadow: 0 1px 3px
    ${({ theme, $color }) => shadowColor(theme.darkMode, $color)};
`
