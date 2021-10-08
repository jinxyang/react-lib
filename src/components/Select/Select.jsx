import React from 'react'
import { Select } from 'antd'

const ProSelect = ({ value = [], onChange = () => {}, ...props }) => {
  return (
    <Select
      {...props}
      value={value[0]}
      onChange={(...value) => onChange(value)}
    />
  )
}

export default ProSelect
