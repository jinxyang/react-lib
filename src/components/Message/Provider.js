import React from 'react'
import { nanoid } from 'nanoid'

import Portal from '../Portal'
import MessageList from './MessageList'

export const MessageContext = React.createContext([])

const MessageProvider = ({ children }) => {
  const [list, setList] = React.useState([])

  const push = (type, text, options = {}) => {
    const newMessage = { id: nanoid(), type, text, ...options }
    setList([...list, newMessage])
  }

  const info = (...args) => push('info', ...args)
  const success = (...args) => push('success', ...args)
  const error = (...args) => push('error', ...args)
  const warn = (...args) => push('warn', ...args)

  return (
    <MessageContext.Provider value={{ list, info, success, error, warn }}>
      <Portal>
        <MessageList list={list} />
      </Portal>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider
