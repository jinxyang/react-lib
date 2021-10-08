import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import MessageProvider from '../Message/Provider'

import GlobalStyle from './GlobalStyle'
import colorGenerator, {
  light,
  dark,
  gray,
  transparent,
} from './colorGenerator'
import themes from './themes'

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  padding: env(safe-area-inset-top, 20px) env(safe-area-inset-right, 20px)
    env(safe-area-inset-bottom, 20px) env(safe-area-inset-left, 20px);
  background-color: ${({ theme }) => theme.background};
  transition: background-color 150ms;
`

const Provider = ({ theme = 'apple', darkMode = false, children }) => {
  const compoundTheme = React.useMemo(() => {
    const themeName = theme in themes ? theme : 'antDesign'
    const { size, gap, radius, colors } = themes[themeName]
    const compoundColors = {}

    // 生成各颜色，default为原色，light和dark均为9个颜色
    // 所有颜色均为19个，由淡入深
    Object.keys(colors).forEach((name) => {
      const color = colors[name]
      compoundColors[name] = colorGenerator(color, dark.background)
    })

    const compoundTheme = {
      darkMode,
      size,
      sizeString: size + 'px',
      gap,
      gapString: gap + 'px',
      radius,
      radiusString: radius + 'px',
      colors: {
        ...compoundColors,
        gray,
        transparent: transparent[darkMode ? 'light' : 'dark'],
      },
      ...(darkMode ? dark : light),
    }
    console.log(compoundTheme)
    return compoundTheme
  }, [theme, darkMode])

  return (
    <ThemeProvider theme={compoundTheme}>
      <GlobalStyle />
      <MessageProvider>
        <Root theme={compoundTheme}>{children}</Root>
      </MessageProvider>
    </ThemeProvider>
  )
}

export default Provider
