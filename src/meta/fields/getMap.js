import createElements from './createElements'
import model from './model'

const getMap = ({ global = {}, ...map }, type = '', category) => {
  const globalModel = { ...model, ...global.model }
  const globalMap = {
    columns: createElements(globalModel, global.columns ?? {}),
    filters: createElements(globalModel, global.filters ?? {}),
    forms: createElements(globalModel, global.forms ?? {}),
  }
  return category
    ? { ...globalMap[type], ...map[category]?.[type] }
    : Object.keys({ ...map }).reduce((a, category) => {
        return {
          ...a,
          [category]: { ...globalMap[type], ...map[category]?.[type] },
        }
      }, {})
}

export default getMap
