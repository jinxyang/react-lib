import React from 'react'
import _ from 'lodash'

import useLocation from './useLocation'

const useMenu = (menus = []) => {
  const location = useLocation()

  return React.useMemo(() => {
    const matchedMenus = _.filter(
      menus,
      ({ path }) => location.pathname.indexOf(path) === 0,
    )

    if (matchedMenus.length === 1) return matchedMenus[0]

    const currentPath =
      '/' + _.flow(_.split(?, '/'), _.filter(?, Boolean))(location.pathname)[0]

    return _.find(matchedMenus, { path: currentPath }) ?? null
  }, [location.pathname, menus])
}

export default useMenu
