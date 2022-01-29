import React from 'react'

const useThrottle = (fn, delay = 0) => {
  const timer = React.useRef(null)
  return (...args) => {
    timer && clearTimeout(timer.current)
    return new Promise((resolve, reject) => {
      timer.current = setTimeout(async () => {
        try {
          resolve(await fn(...args))
        } catch (e) {
          reject(e)
        }
      }, delay)
    })
  }
}

export default useThrottle
