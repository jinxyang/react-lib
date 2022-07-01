import React from 'react'
import { Select } from 'antd'

const ProSelect = ({ value = '', onChange = () => {}, ...props }) => {
  return (
    <Select
      showSearch
      allowClear
      optionFilterProp="label"
      {...props}
      value={value}
      onChange={onChange}
    />
  )
}

export default ProSelect
