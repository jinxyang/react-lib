import React from 'react'

import Image from '../Image'

const defaultSrc = '/static/default_avatar.png'

const Avatar = ({
  src = '',
  alt = 'Avatar',
  size = '100%',
  circle = false,
  background = false,
}) => {
  return (
    <Image
      src={src || defaultSrc}
      alt={alt}
      width={size}
      height={size}
      shape={circle ? 'circle' : 'square'}
      background={background}
    />
  )
}

export default Avatar
