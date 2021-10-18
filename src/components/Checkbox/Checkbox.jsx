import React from 'react'
import { Checkbox } from 'antd'

const ProCheckbox = ({ value = '', onChange = () => {}, ...props }) => {
  return (
    <Checkbox
      {...props}
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
  )
}

export default ProCheckbox
