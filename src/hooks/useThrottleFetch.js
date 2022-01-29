import useFetch from './useFetch'
import useThrottle from './useThrottle'

const useThrottleFetch = (delay, ...args) => {
  const [state, fetch, abort] = useFetch(...args)
  return [state, useThrottle(fetch, delay), abort]
}

export default useThrottleFetch
