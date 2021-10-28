import React from 'react'

import Image from '../Image'

import defaultAvatar from './default_avatar.png'

const Avatar = ({
  src = '',
  alt = 'Avatar',
  size = '100%',
  circle = false,
  ...imageProps
}) => {
  return (
    <Image
      src={src || defaultAvatar}
      alt={alt}
      width={size}
      height={size}
      shape={circle ? 'circle' : 'square'}
      {...imageProps}
    />
  )
}

export default Avatar
