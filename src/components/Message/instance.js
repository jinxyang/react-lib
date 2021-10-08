import React from 'react'
import ReactDOM from 'react-dom'

import MessageList from './MessageList'

const createInstance = () => {
  const instance = {}
  const div = document.createElement('div')
  document.body.appendChild(div)
  ReactDOM.render(<MessageList ref={(add) => (instance.add = add)} />, div)
  return instance
}
const instance = createInstance()
const message = (...args) => instance.add('normal', ...args)
message.success = (...args) => instance.add('success', ...args)
message.error = (...args) => instance.add('error', ...args)
message.warn = (...args) => instance.add('warn', ...args)

export default message
