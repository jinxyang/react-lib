import React from 'react'
import { nanoid } from 'nanoid'

import Portal from '../Portal'
import MessageList from './MessageList'

export const MessageContext = React.createContext({})

const MessageProvider = ({ children }) => {
  const [list, setList] = React.useState([])

  const push = React.useCallback((type, text, options = {}) => {
    const newMessage = { id: nanoid(), type, text, ...options }
    setList((list) => [...list, newMessage])
  }, [])

  const actions = React.useMemo(() => {
    return {
      error: (...args) => push('error', ...args),
      info: (...args) => push('info', ...args),
      success: (...args) => push('success', ...args),
      warn: (...args) => push('warn', ...args),
    }
  }, [push])

  return (
    <MessageContext.Provider value={actions}>
      <Portal>
        <MessageList list={list} />
      </Portal>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider
