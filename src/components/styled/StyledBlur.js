import styled, { css } from 'styled-components'
import Color from 'color'

import styles from '../../styles'

const alpha = (color, val) => Color(color).alpha(val).rgb()

const backgroundColor = (theme, color = '', opacity) => {
  if (!color || (color && !theme.colors[color])) {
    return alpha(theme.foreground, opacity ?? (theme.darkMode ? 0.1 : 0.05))
  }
  const darkColor = theme.colors[color].dark[6]
  const lightColor = theme.colors[color].light[6]
  return alpha(theme.darkMode ? darkColor : lightColor, opacity)
}

const filterStyle = css`
  backdrop-filter: blur(3px);
`

export default styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme, $color, $opacity }) =>
    backgroundColor(theme, $color, $opacity)};
  border-radius: ${styles.getRadius()};
  transition: background-color 150ms;
  ${styles.shadow};

  ${({ $opacity }) => $opacity < 1 && filterStyle};
`
