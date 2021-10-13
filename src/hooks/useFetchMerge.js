import React from 'react'

const defaultState = {
  loading: false,
  code: 0,
}

const useFetchMerge = (fetches = [], callback = () => {}) => {
  const [state, setState] = React.useState(defaultState)

  const start = React.useCallback(async () => {
    setState(defaultState)
    const result = await Promise.all(
      fetches.map(async (currentFetch) => {
        const [request, payload] = Array.isArray(currentFetch)
          ? currentFetch
          : [currentFetch]
        return await request(payload)
      }),
    )
    const errorItem = result.find(({ code }) => !!code)
    if (errorItem) {
      setState({ loading: false, code: errorItem.code })
    }
    callback(state, result)
    return result
  }, [])

  return [state, start]
}

export default useFetchMerge
