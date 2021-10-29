import React from 'react'

const useClick = (handles = {}, defaultListen = false, element = window) => {
  const [listen, setListen] = React.useState(defaultListen)

  const handleKeypress = React.useCallback((event) => {
    handles[event.key.toLocaleLowerCase()]?.(event)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addListener = React.useCallback(() => {
    if (element && listen) {
      console.log('开始监听')
      element.addEventListener('keyup', handleKeypress, false)
    }
  }, [element, handleKeypress, listen])

  const removeListener = React.useCallback(() => {
    if (element && listen) {
      console.log('结束监听')
      element.removeEventListener('keyup', handleKeypress, false)
    }
  }, [element, handleKeypress, listen])

  React.useEffect(() => {
    removeListener()
    addListener()

    return () => {
      removeListener()
    }
  }, [addListener, removeListener])

  React.useEffect(() => {
    setListen(defaultListen)
  }, [defaultListen])

  return [listen, setListen]
}

export default useClick
