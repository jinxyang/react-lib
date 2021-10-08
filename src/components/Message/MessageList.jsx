import React from 'react'

import Message from '../Message'

const MessageList = ({ list }) => {
  const [closed, setClosed] = React.useState({})

  const handleClose = (id) => {
    setClosed((closed) => ({ ...closed, [id]: true }))
  }

  return list.map(({ id, ...props }) => (
    <Message
      key={id}
      {...props}
      close={closed[id]}
      onClose={() => handleClose(id)}
    />
  ))
}

export default MessageList
