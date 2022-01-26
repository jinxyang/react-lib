import React from 'react'

import normalizer from '../utils/normalizer'
import useLocation from './useLocation'

const useMenu = (menus = []) => {
  const location = useLocation()

  const menusByPath = React.useMemo(() => {
    return normalizer(menus, 'path')
  }, [menus])

  return React.useMemo(() => {
    return menusByPath[location.pathname] ?? null
  }, [location.pathname, menusByPath])
}

export default useMenu
