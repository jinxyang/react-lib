export default function selectFile(type) {
  const types = {
    excel:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    image: 'image/png, image/jpeg, image/gif',
    dwg: 'application/acad, application/dxf',
    pdf: 'application/pdf',
    word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword',
  }
  const accept =
    typeof type === 'string'
      ? types[type]
      : type.map((t) => types[t]).join(', ')
  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.style.display = 'none'
    input.type = 'file'
    input.accept = accept
    input.onclick = (e) => {
      e.target.value = ''
    }
    input.onchange = async (e) => {
      resolve(e.target.files[0])
      input.remove()
    }
    input.oncancel = () => {
      console.log('取消了')
    }
    document.body.appendChild(input)
    input.click()
  })
}
