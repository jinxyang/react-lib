const dropFields = (fields, excludes) => {
  return [
    ...new Set(
      fields.filter((item) => {
        const field = typeof item === 'string' ? item : item[0]
        return !excludes.includes(field)
      }),
    ),
  ]
}

export default dropFields
