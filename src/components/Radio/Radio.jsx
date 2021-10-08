import React from 'react'
import { Radio } from 'antd'

const ProRadio = ({ value = '', onChange = () => {}, ...props }) => {
  return (
    <Radio.Group
      {...props}
      optionType="button"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default ProRadio
