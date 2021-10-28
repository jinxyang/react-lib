import React from 'react'

import Image from '../Image'

import defaultAvatar from './default_avatar.png'

const Avatar = ({
  src = '',
  alt = 'Avatar',
  size = '100%',
  circle = false,
  background = false,
  ...props
}) => {
  return (
    <Image
      src={src || defaultAvatar}
      alt={alt}
      width={size}
      height={size}
      shape={circle ? 'circle' : 'square'}
      background={background}
      {...props}
    />
  )
}

export default Avatar
