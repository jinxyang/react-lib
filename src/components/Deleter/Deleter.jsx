import React from 'react'

import { Confirm, useFetch } from '@jinxyang/react-lib'

const Deleter = ({
  url = null,
  title = '',
  name = '',
  children,
  onDeleted = () => {},
  onCancel = () => {},
}) => {
  const service = React.useCallback(() => {
    return {
      method: 'delete',
      url,
    }
  }, [url])

  const [{ loading }, clean] = useFetch(service, ({ code }) => {
    !code && onDeleted()
  })

  return (
    <Confirm
      show={!!url}
      title={title}
      cancelProps={{ disabled: loading }}
      okProps={{ danger: true, loading }}
      onOk={clean}
      onCancel={onCancel}
    >
      {children || `确定要删除 "${name}" 吗？`}
    </Confirm>
  )
}

export default Deleter
