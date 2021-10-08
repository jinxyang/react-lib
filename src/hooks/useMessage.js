import React from 'react'

import { MessageContext } from '../components/Message/Provider'

const useMessage = () => React.useContext(MessageContext)
export default useMessage
