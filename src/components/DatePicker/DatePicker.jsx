import React from 'react'
import { DatePicker } from 'antd'

const ProDatePicker = ({ value = [], onChange = () => {}, ...props }) => {
  return (
    <DatePicker
      {...props}
      value={value[0]}
      onChange={(...value) => onChange(value)}
    />
  )
}

export default ProDatePicker
