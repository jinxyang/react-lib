import React from 'react'
import { Input } from 'antd'

const ProInput = ({
  value = '',
  autoComplete = 'new-password',
  onChange = () => {},
  ...props
}) => {
  return (
    <Input
      {...props}
      value={value}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default ProInput
