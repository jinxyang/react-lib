import React from 'react'

const useKeypress = (handles = {}, defaultToggle = null, element = window) => {
  const [listening, setListening] = React.useState(false)
  const [toggle, setToggle] = React.useState(defaultToggle)

  const handleKeypress = React.useCallback(
    (event) => {
      handles[event.key.toLocaleLowerCase()]?.(event)
    },
    [handles],
  )

  const addListener = React.useCallback(() => {
    if (element && !listening) {
      console.log('开始监听键盘')
      setListening(true)
      element.addEventListener('keyup', handleKeypress, false)
    }
  }, [element, handleKeypress, listening])

  const removeListener = React.useCallback(() => {
    if (element && listening) {
      console.log('结束监听键盘')
      setListening(false)
      element.removeEventListener('keyup', handleKeypress, false)
    }
  }, [element, handleKeypress, listening])

  React.useEffect(() => {
    toggle ? addListener() : removeListener()

    return () => {
      removeListener()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle])

  React.useEffect(() => {
    setToggle(defaultToggle)
  }, [defaultToggle])

  return [listening, setToggle]
}

export default useKeypress
