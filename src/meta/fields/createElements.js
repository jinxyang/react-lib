import metaOptions from '../options'

const defaultTypes = {
  string: 'Input',
  number: 'Number',
  text: 'Textarea',
  boolean: 'Radio',
  date: 'DatePicker',
}

const defaultOptions = {
  locale: metaOptions.locale,
  exclude: [],
  formatter: (element) => element,
}

const createElements = (model = {}, fields = {}, options = {}) => {
  const { locale, exclude, formatter } = { ...defaultOptions, options }

  const elements = Object.keys(model)
    .filter((key) => !exclude.includes(key))
    .reduce((elements, key) => {
      const modelField = {
        ...model[key],
        key,
        type: defaultTypes[model[key].type],
      }
      const fieldValue = fields[key]
      const field = fieldValue
        ? typeof fieldValue === 'string'
          ? { type: fieldValue }
          : fieldValue
        : {}
      const { type, key: dbKey, label, ...props } = { ...modelField, ...field }

      if (!type || !dbKey || !label) {
        return elements
      }

      const element = {
        type,
        key: dbKey,
        label,
        ...Object.keys(props).reduce((newProps, propName) => {
          const propValue = props[propName]
          return {
            ...newProps,
            [propName]:
              typeof propValue === 'function'
                ? propValue(
                    {
                      ...modelField,
                      label:
                        typeof modelField.label === 'string'
                          ? modelField.label
                          : modelField.label[locale],
                    },
                    { locale },
                  )
                : propValue,
          }
        }, {}),
      }

      return {
        ...elements,
        [key]: formatter(element),
      }
    }, {})

  return elements
}

export default createElements
