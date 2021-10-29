import React from 'react'

const useKeypress = (handles = {}, defaultOn = false, element = window) => {
  const [on, setToggle] = React.useState(defaultOn)

  const handleKeypress = React.useCallback(
    (event) => {
      handles[event.key.toLocaleLowerCase()]?.(event)
    },
    [handles],
  )

  React.useEffect(() => {
    element[on ? 'addEventListener' : 'removeEventListener'](
      'keypress',
      handleKeypress,
      false,
    )
    return () => {
      element.removeEventListener('keypress', handleKeypress, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on])

  return [on, setToggle]
}

export default useKeypress
