import React from 'react'
import { Input } from 'antd'

const Password = ({
  value = '',
  autoComplete = 'new-password',
  onChange = () => {},
  ...props
}) => {
  return (
    <Input
      {...props}
      type="password"
      value={value}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Password
