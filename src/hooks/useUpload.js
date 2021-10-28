import React from 'react'

import useFetch from './useFetch'

const useUpload = (url, callback = () => {}) => {
  const service = React.useCallback(
    (files, key) => {
      const formData = new FormData()
      formData.append(key || 'file', files)
      return {
        method: 'post',
        url: url || '/upload',
        headers: {},
        data: formData,
      }
    },
    [url],
  )
  return useFetch(service, callback)
}

export default useUpload
