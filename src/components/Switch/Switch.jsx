import React from 'react'
import { Switch } from 'antd'

const ProSwitch = ({
  value = 0,
  onChange = () => {},
  style = {},
  ...props
}) => {
  return (
    <span style={style}>
      <Switch
        {...props}
        checked={Boolean(value)}
        onChange={(checked) => onChange(Number(checked))}
      />
    </span>
  )
}

export default ProSwitch
