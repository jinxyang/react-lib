import React from 'react'

import App from '../App'
import StyledCenter from '../styled/StyledCenter'

const NotFound = () => {
  return (
    <App fill={false} color="red" opacity={0.5}>
      <StyledCenter>权限不足，请联系管理员</StyledCenter>
    </App>
  )
}

export default NotFound
