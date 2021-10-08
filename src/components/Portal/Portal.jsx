import React from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children, container = document.body }) => {
  const node = React.useRef(null)

  React.useEffect(() => {
    node.current = container || document.body
    return () => {
      node.current = null
    }
  }, [container])

  return node && createPortal(children, container)
}

export default Portal
