import getField from './getField'
import getMap from './getMap'

const getArgs = (categoryOrFields, fieldsOrOptions, otherOptions) => {
  const hasCategory = typeof categoryOrFields === 'string'

  return {
    category: hasCategory ? categoryOrFields : '',
    fields: hasCategory ? fieldsOrOptions : categoryOrFields,
    options: (hasCategory ? otherOptions : fieldsOrOptions) ?? {},
  }
}

const getElements = (map, type, { category, fields, options = {} }) => {
  const categoryMap = getMap(map, type, category)
  return fields.map(getField(categoryMap, ?, options)).filter(Boolean)
}

const createFields = (map = {}) => {
  return {
    getColumns: (...args) => getElements(map, 'columns', getArgs(...args)),
    getFilters: (...args) => getElements(map, 'filters', getArgs(...args)),
    getForms: (...args) => getElements(map, 'forms', getArgs(...args)),
  }
}

export default createFields
