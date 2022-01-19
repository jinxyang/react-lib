const camelCase = (string) => {
  return string.replace(/-(\w)/g, (_, $1) => $1.toUpperCase())
}

export default camelCase
