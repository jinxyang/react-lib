import { useConfig } from '../components/Provider'
import camelCase from '../utils/camelCase'

const usePermissions = (permissions = []) => {
  const { permissionsMap } = useConfig()
  const permissionList = [permissions].flat(2)
  return permissionList.reduce((a, p) => {
    const permission = permissionsMap[p]
    return {
      ...a,
      ...(permission && { [camelCase(p)]: permission }),
    }
  }, {})
}

export default usePermissions
