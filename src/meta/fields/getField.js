import { get } from 'lodash'

const getField = (map, name, options = {}) => {
  const [field, customProps] = Array.isArray(name) ? name : [name, {}]
  const props = get(map, field)

  if (!props) return null

  const { label, ...defaultProps } = props
  const { locale } = { locale: 'zh', ...options }
  return {
    label: typeof label === 'string' ? label : label[locale] ?? '',
    ...defaultProps,
    ...customProps,
  }
}

export default getField
