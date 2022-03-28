/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

const useKeypress = (key, element = window) => {
  const [keyboard, setKeyboard] = React.useState({})

  const keys = React.useMemo(() => {
    return Array.isArray(key) ? key : [key]
  }, [])

  const findKey = React.useCallback((e) => {
    const key = keys.find((k) => k === e.key)
    const keyCode = keys.find((k) => k === e.keyCode)
    return key || keyCode
  }, [])

  const setKey = React.useCallback((e, value) => {
    const key = findKey(e)
    key && setKeyboard((keyboard) => ({ ...keyboard, [key]: value }))
  }, [])

  const handleKeydown = React.useCallback((e) => {
    setKey(e, true)
  }, [])

  const handleKeyup = React.useCallback((e) => {
    setKey(e, false)
  }, [])

  const addListener = React.useCallback(() => {
    element.addEventListener('keydown', handleKeydown, false)
    element.addEventListener('keyup', handleKeyup, false)
  }, [])

  const removeListener = React.useCallback(() => {
    element.removeEventListener('keydown', handleKeydown, false)
    element.removeEventListener('keydown', handleKeyup, false)
  }, [])

  const toggle = React.useCallback((on) => {
    on ? addListener() : removeListener()
  }, [])

  React.useEffect(() => {
    return () => {
      removeListener()
    }
  }, [])

  return [keyboard, toggle]
}

export default useKeypress
