import React from 'react'
import { matchPath } from 'react-router-dom'

import useLocation from '../../hooks/useLocation'
import useNavigate from '../../hooks/useNavigate'
import Menu from '../Menu'

const MenuWithRoute = ({ list = [], routes = [] }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [folderState, setFolderState] = React.useState({})

  const folders = React.useMemo(() => {
    return list.filter(({ children }) => !!children)
  }, [list])
  const currentMenu = React.useMemo(() => {
    return (
      routes.find(({ path }) => {
        if (path === '/' && location.pathname !== '/') {
          return false
        }
        return matchPath(location.pathname, { path })
      }) ?? {}
    )
  }, [location.pathname, routes])

  const currentFolder = React.useMemo(() => {
    return folders.find(({ children }) =>
      children.find(({ name }) => name === currentMenu.name),
    )
  }, [currentMenu.name, folders])

  const handleItemClick = (path) => {
    location.pathname !== path && navigate(path)
  }

  const handleFolderClick = (title) => {
    setFolderState((state) => {
      return {
        ...state,
        [title]: !state[title],
      }
    })
  }

  React.useEffect(() => {
    if (currentFolder && folderState[currentFolder.title] === undefined) {
      handleFolderClick(currentFolder.title)
    }
  }, [currentFolder, folderState])

  return (
    <Menu>
      {list.map(({ id, name, title, path, icon, children = [] }) => {
        if (!name) {
          return (
            <Menu.Folder key={id} title={title} icon={icon}>
              {children.map(({ id, name, path, title, icon }) => (
                <Menu.Item
                  active={name === currentMenu.name}
                  icon={icon}
                  key={id}
                  onClick={() => handleItemClick(path)}
                >
                  {title}
                </Menu.Item>
              ))}
            </Menu.Folder>
          )
        }
        return (
          <Menu.Item
            active={name === currentMenu.name}
            icon={icon}
            key={id}
            onClick={() => handleItemClick(path)}
          >
            {title}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default MenuWithRoute
