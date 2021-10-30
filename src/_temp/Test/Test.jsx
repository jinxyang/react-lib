import React from 'react'
import { Button } from 'antd'

import TumblerButton from './TumblerButton'
import Tumbler from './Tumbler'

const Test = () => {
  return (
    <div>
      <Tumbler rotate={[1, 0.5]}>
        <Button type="primary">Button</Button>
      </Tumbler>
      <br />
      <br />
      <Button type="primary">Button</Button>
      <br />
      <br />
      <TumblerButton>Button</TumblerButton>
    </div>
  )
}

export default Test
