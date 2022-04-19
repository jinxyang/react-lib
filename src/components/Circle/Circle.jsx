import React from 'react'
import { nanoid } from 'nanoid'

import { View } from '@jinxyang/seal-react'

const Circle = ({
  color = 'primary.transparent[8]',
  size = '90%',
  anime = true,
  timing = 10,
  delay = 0,
  rotate = 360,
  offset = 5,
  random = false,
}) => {
  const id = React.useMemo(() => {
    return nanoid()
  }, [])

  return (
    <View
      styles={{
        ['@keyframes rotate' + id]: {
          '50%': {
            borderRadius: random
              ? '45% / 42% 38% 58% 49%'
              : `50% / ${50 - offset}% ${50 + offset}% ${50 - offset}% ${
                  50 + offset
                }%`,
          },
          '100%': {
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
          },
        },
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(0)',
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: random
          ? '42% 38% 62% 49% / 45%'
          : `50% / ${50 + offset}% ${50 - offset}% ${50 + offset}% ${
              50 - offset
            }%`,
        animation: anime && `rotate${id} ${timing}s ${delay}s infinite linear`,
      }}
    />
  )
}

export default Circle
