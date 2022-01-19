export default function selectFile(accept) {
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    accept && (input.accept = accept)
    input.onchange = async (e) => {
      resolve(e.target.files[0])
    }
    input.click()
  })
}
