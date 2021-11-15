import React from 'react'
import { Input } from 'antd'

const Password = ({ value = '', onChange = () => {}, ...props }) => {
  return (
    <Input
      {...props}
      type="password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Password
