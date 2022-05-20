import Color from 'color'

const colorFilter = (color) =>
  !['#FFFFFF', '#000000'].includes(color.toUpperCase())

const generator = (c, darkColor = '#000') => {
  const color = Color(c)
  const length = 10

  const light = Array.from({ length })
    .map((_, index) => {
      const step = 1 / length
      const weight = Number((step * (length - index)).toFixed(2))
      return color.mix(Color('#fff'), weight).hex()
    })
    .filter(colorFilter)
  const dark = Array.from({ length })
    .map((_, index) => {
      const step = 1 / length
      const weight = Number((step * (length - index)).toFixed(2))
      return color.mix(Color(darkColor), weight).hex()
    })
    .filter(colorFilter)
    .reverse()
  dark.pop()

  return {
    default: c,
    light,
    dark,
  }
}

const lightForeground = Color('rgba(0,0,0,0.05)')
const lightBackground = Color('#fff')
const darkForeground = Color('rgba(255,255,255,0.1)')
const darkBackground = Color('#181a21')

export const light = {
  foreground: lightForeground.hex(),
  foregroundHover: lightForeground.mix(lightBackground, 0.5).hex(),
  background: lightBackground.hex(),
  font: {
    color: '#666',
  },
}
export const dark = {
  foreground: darkForeground.rgb().string(),
  foregroundHover: darkForeground.mix(lightBackground, 0.05).hex(),
  background: darkBackground.hex(),
  font: {
    color: '#cfcfcf',
  },
}
const transparentRepeat = (rgb) => [
  `rgba(${rgb} / 3%)`,
  ...Array.from({ length: 18 }).map(
    (_, index) => `rgba(${rgb} / ${(index + 1) * 5}%)`,
  ),
]
export const transparent = {
  light: transparentRepeat('255 255 255'),
  dark: transparentRepeat('0 0 0'),
}

export const gray = Array.from({ length: 20 })
  .map((_, index) =>
    Color('#fff')
      .darken(index / 20)
      .hex(),
  )
  .filter(colorFilter)

export default generator
