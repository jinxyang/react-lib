import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

const ProDatePicker = ({
  value,
  onChange = () => {},
  simpleValue = false,
  ...props
}) => {
  return (
    <DatePicker
      {...props}
      value={simpleValue ? (value ? moment(value) : undefined) : value?.[0]}
      onChange={(...values) => onChange(simpleValue ? values[1] : values)}
    />
  )
}

export default ProDatePicker
