import React from 'react'
import { Input } from 'antd'

const Textarea = ({ value = '', onChange = () => {}, ...props }) => {
  return (
    <Input.TextArea
      {...props}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Textarea
