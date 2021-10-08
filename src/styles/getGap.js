import { css } from 'styled-components'

/**
 * 兼容 $gap
 * typeof === 'string' // $gap
 * typeof === 'number' // theme.gap * $gap
 */
export default (gap = 1) => css`
  ${({ theme, $gap }) =>
    typeof $gap === 'string'
      ? $gap
      : Math.floor(theme.gap * ($gap ?? gap)) + 'px'}
`
