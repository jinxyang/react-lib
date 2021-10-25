import React from 'react'
import { Checkbox } from 'antd'

const ProCheckbox = ({ value = '', onChange = () => {}, ...props }) => {
  return <Checkbox.Group {...props} value={value} onChange={onChange} />
}

export default ProCheckbox
