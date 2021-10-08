import { css } from 'styled-components'

/**
 * 兼容 $radius
 * typeof === 'string' // $radius
 * typeof === 'number' // theme.radius * $radius
 */
export default (radius = 1) => css`
  ${({ theme, $radius }) =>
    typeof $radius === 'string'
      ? $radius
      : Math.floor(theme.radius * ($radius ?? radius)) + 'px'}
`
