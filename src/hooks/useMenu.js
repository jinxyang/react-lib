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

    const matchedMenu = _.flow(
      _.map(?, ({ path }, index) => ({
        match: location.pathname.match(path)?.[0]?.length ?? 0,
        index,
        path,
      })),
      _.orderBy(?, 'match', 'desc'),
    )(matchedMenus)?.[0]

    if (matchedMenu?.path === '/' && location.pathname !== '/') return null

    return matchedMenus[matchedMenu?.index]
  }, [location.pathname, menus])
}

export default useMenu
