const deleteProp = (object, prop) => {
  const { [prop]: _, ...newObject } = object
  return newObject
}

export default deleteProp
