import React from 'react'

import Confirm from '../Confirm'
import useFetch from '../../hooks/useFetch'
import useMessage from '../../hooks/useMessage'

const Deleter = ({
  url = null,
  title = '',
  name = '',
  children,
  onDeleted = () => {},
  onCancel = () => {},
}) => {
  const message = useMessage()
  const service = React.useCallback(() => {
    return {
      method: 'delete',
      url,
    }
  }, [url])

  const [{ loading }, clean] = useFetch(service, ({ code }) => {
    if (!code) {
      message.info('删除成功')
      onDeleted()
    }
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
