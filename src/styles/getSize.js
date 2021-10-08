import { css } from 'styled-components'

/**
 * 兼容 $size
 */
export default (multiple = 1) => css`
  ${({ theme, $size }) => $size || theme.size * multiple + 'px'}
`
