import React from 'react'

import Form from '../Form'
import withFilter from './withFilter'

const Filter = ({ children, ...props }) => {
  return (
    <Form {...props} mode="flex" wrap={true} gap={1} wrapper={withFilter}>
      {children}
    </Form>
  )
}

export default Filter
