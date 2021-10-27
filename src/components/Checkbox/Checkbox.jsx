import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'antd'

const StyledCheckbox = styled.div`
  padding-top: 5px;
`

const ProCheckbox = ({ value = '', onChange = () => {}, ...props }) => {
  return (
    <StyledCheckbox>
      <Checkbox.Group {...props} value={value} onChange={onChange} />
    </StyledCheckbox>
  )
}

export default ProCheckbox
