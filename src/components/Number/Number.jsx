import React from 'react'
import { InputNumber } from 'antd'

const Number = ({
  value = '',
  autoComplete = 'off',
  onChange = () => {},
  ...props
}) => {
  return (
    <InputNumber
      {...props}
      value={value}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Number
