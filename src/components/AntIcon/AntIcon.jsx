import React from 'react'
import * as icons from '@ant-design/icons'

const AntIcon = ({ name, style = {} }) => {
  const IconComponent = icons[name]
  return IconComponent ? <IconComponent style={style} /> : null
}

export default AntIcon
