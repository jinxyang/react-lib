const defaultOptions = {
  idProp: 'id',
  parentIdProp: 'parentId',
  formatter: (v) => v,
}

const flatTree = (
  tree = [],
  childrenProp = 'children',
  customOptions = defaultOptions,
  parentIdValue,
) => {
  const { idProp, parentIdProp, formatter } = {
    ...defaultOptions,
    ...customOptions,
  }
  return tree
    .map((item) => {
      return [
        formatter({
          ...item,
          ...(parentIdValue && { [parentIdProp]: parentIdValue }),
        }),
        ...(item[childrenProp]
          ? flatTree(
              item[childrenProp],
              childrenProp,
              customOptions,
              item[idProp],
            )
          : []),
      ]
    })
    .flat(Infinity)
}

export default flatTree
