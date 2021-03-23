const saveFile = (str, fileName) => {
  const blob = new Blob([str], {type: 'text/xml'})
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = `${fileName.slice(0, -4)}_edit.kpt`
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
}

const process = (str, fileName) => {
  let _str = str
  const iterator = _str.matchAll(/group id=("customItem\d*")[\s\S]*?("alpo_sidebar_fullitemName\d*)"/g)
  const arr = Array.from(iterator, (entry) => entry[0])
  arr.map((entry, index) => {
    const r = entry.replace(/alpo_sidebar_fullitemName\d*/, `alpo_sidebar_fullitemName${index + 1}`)
    _str = _str.replace(entry, r)
  })
  saveFile(_str, fileName)
}

function start () {
  const fileInput = document.getElementById('kpt')
  fileInput.addEventListener('change', _ => {
    const file = fileInput.files[0]
    const reader = new FileReader()
    reader.onload = _ => process(reader.result, file.name)
    reader.readAsText(file)
  });
}

window.onload = start
