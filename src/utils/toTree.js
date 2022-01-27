const defaultOptions = {
  idProp: 'id',
  parentIdProp: 'parentId',
  childrenProp: 'children',
  formatter: (v) => v,
  sorter: () => 0,
}

const toTree = (
  list = [],
  customOptions = defaultOptions,
  parentValue = '',
) => {
  const { idProp, parentIdProp, childrenProp, formatter, sorter } = {
    ...defaultOptions,
    ...customOptions,
  }
  return list
    .filter((item) => item[parentIdProp] === parentValue)
    .sort(sorter)
    .map((item, index) => {
      const newItem = formatter(item, index)
      const children = toTree(list, customOptions, item[idProp])
      return (
        newItem && {
          ...formatter(item, index),
          ...(children.length
            ? { [childrenProp]: toTree(list, customOptions, item[idProp]) }
            : {}),
        }
      )
    })
    .filter(Boolean)
}

export default toTree
