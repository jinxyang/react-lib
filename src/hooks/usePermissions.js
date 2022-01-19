import { useConfig } from '../components/Provider'
import camelCase from '../utils/camelCase'

const usePermission = (permission = []) => {
  const { permissionsMap } = useConfig()
  const permissions = [permission].flat(2)
  return permissions.reduce((a, p) => {
    const permission = permissionsMap[p]
    return {
      ...a,
      ...(permission && { [camelCase(p)]: permission }),
    }
  }, {})
}

export default usePermission
