import React from 'react'

import Cropper from '../Cropper'
import Avatar from '../Avatar'

const AvatarCropper = ({
  value = '',
  size = '100%',
  onChange = () => {},
  uploadProps = {},
  ...avatarProps
}) => {
  return (
    <Cropper
      value={value}
      title="头像"
      cropProps={{ aspectRatio: 1, autoCropArea: 1 }}
      uploadProps={uploadProps}
      imageProps={{ width: size }}
      onChange={onChange}
    >
      <Avatar {...avatarProps} size={size} src={value} />
    </Cropper>
  )
}

export default AvatarCropper
