const defaultOptions = {
  exclude: [],
  formatter: (v) => v,
}

const formatters = {
  accept: (exts) => exts.map((ext) => '.' + ext).join(','),
}

const getExtensions = (type, customOptions = {}) => {
  const { exclude, formatter } = { ...defaultOptions, ...customOptions }
  const types = typeof type === 'string' ? [type] : type
  const map = {
    image: ['jpg', 'png', 'gif'],
    excel: ['xlsx', 'xls'],
    word: ['doc', 'docx'],
    pdf: ['pdf'],
    dwg: ['dwg'],
  }
  const exts = types
    .map((type) => map?.[type]?.filter((ext) => !exclude.includes(ext)))
    .filter(Boolean)
    .flat(2)
  return typeof formatter === 'function'
    ? formatter(exts)
    : formatters?.[formatter](exts) ?? defaultOptions.formatter(exts)
}

export default getExtensions
