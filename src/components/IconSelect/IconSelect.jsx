import React from 'react'
import { Button } from 'antd'

import Modal from '../Modal'

const IconSelect = () => {
  const [show, setShow] = React.useState(false)

  return (
    <>
      <Button onClick={() => setShow(true)}>选择图标</Button>
      <Modal show={show} title="选择图标" onClose={() => setShow(false)}>
        图标列表
      </Modal>
    </>
  )
}

export default IconSelect
