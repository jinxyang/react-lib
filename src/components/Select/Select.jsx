import React from 'react'
import { Select } from 'antd'

const ProSelect = ({
  value = [],
  simpleValue = false,
  onChange = () => {},
  ...props
}) => {
  return (
    <Select
      {...props}
      value={Array.isArray(value) ? value[0] : value}
      onChange={(...value) => onChange(simpleValue ? value[0] : value)}
    />
  )
}

export default ProSelect
