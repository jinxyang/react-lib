import React from 'react'

import useFetch from './useFetch'

const useSSO = (url = '', key = '', onChange = () => {}) => {
  const value = new URLSearchParams(location.search).get(key)
  const service = React.useCallback(() => {
    return {
      method: 'post',
      url,
      data: { [key]: value },
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [{ loading }, login] = useFetch(service, onChange)

  React.useEffect(() => {
    value && login()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading
}

export default useSSO
