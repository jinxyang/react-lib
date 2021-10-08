import React from 'react'

const useLocalStorage = (key) => {
  const [value, setValue] = React.useState(() => {
    const value = localStorage.getItem(key)
    try {
      return value ? JSON.parse(value) : value
    } catch {
      return value
    }
  })

  const clean = React.useCallback(() => {
    localStorage.removeItem(key)
  }, [key])

  const setStorage = React.useCallback(
    (newValue) => {
      try {
        if (newValue === null || newValue === undefined) {
          clean()
        } else {
          const storedValue =
            typeof newValue === 'object' ? JSON.stringify(newValue) : newValue
          localStorage.setItem(key, storedValue)
        }
      } catch {}
      setValue(newValue)
    },
    [clean, key],
  )

  return [value, setStorage, clean]
}

export default useLocalStorage
