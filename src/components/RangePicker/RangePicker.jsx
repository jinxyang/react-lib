import React from 'react'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

const ProRangePicker = ({ value = [], onChange = () => {}, ...props }) => {
  return (
    <RangePicker
      {...props}
      value={value[0]}
      onChange={(...value) => onChange(value)}
    />
  )
}

export default ProRangePicker
