import React from 'react'

import useLocation from './useLocation'

const useMenu = (menus = []) => {
  const location = useLocation()

  return React.useMemo(() => {
    return (
      menus.find(({ path }) => location.pathname.indexOf(path) === 0) ?? null
    )
  }, [location.pathname, menus])
}

export default useMenu
