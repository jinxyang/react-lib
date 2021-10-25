import React from 'react'
import { Select } from 'antd'

const ProSelect = ({ value = '', onChange = () => {}, ...props }) => {
  return <Select {...props} value={value} onChange={onChange} />
}

export default ProSelect
