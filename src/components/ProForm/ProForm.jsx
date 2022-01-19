import React from 'react'

import Form from '../Form'

const ProForm = ({
  createService = () => {},
  updateService = () => {},
  ...props
}) => {
  return <Form {...props} />
}

export default ProForm
