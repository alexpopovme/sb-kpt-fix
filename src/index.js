let fileContent =''
let selected = ''

const replaceData = {
  sb: {
    re: /<group[\s\S]*?id=("customItem\d*")[\s\S]*?("alpo_sidebar_fullitemName\d*)[\s\S]*?(alpo_sidebar_fullsubItemIndex\d*)[\s\S]*?(alpo_sidebar_fullsubPanoIDs\d*)[\s\S]*?<\/group/g,
    fn: (entry, index) => {
      const replacement = entry
        .replace(/alpo_sidebar_fullitemName\d*/, `alpo_sidebar_fullitemName${index}`)
        .replace(/alpo_sidebar_fullsubItemIndex\d*/, `alpo_sidebar_fullsubItemIndex${index}`)
        .replace(/alpo_sidebar_fullsubPanoIDs\d*/, `alpo_sidebar_fullsubPanoIDs${index}`)
      fileContent = fileContent.replace(entry, replacement)
    }
  },
  tm: {
    re: /<group[\s\S]*?id=("catProps\d*")[\s\S]*?("alpo_topmenucatTitle\d*)[\s\S]*?(alpo_topmenusubPanoIDs\d*)[\s\S]*?<\/group/g,
    fn: (entry, index) => {
      const replacement = entry
      .replace(/alpo_topmenucatTitle\d*/, `alpo_topmenucatTitle${index}`)
      .replace(/alpo_topmenusubPanoIDs\d*/, `alpo_topmenusubPanoIDs${index}`)
      fileContent = fileContent.replace(entry, replacement)
    }
  }
}

const addSelectEvent = () => {
  const selectElement = document.querySelector('select[name="select"]');
  selected = selectElement.options[selectElement.selectedIndex].value
  selectElement.addEventListener('change', (ev) => {
    selected = ev.target.value
  });
}

const addFileEvent = () => {
  const fileInput = document.getElementById('kpt')
  fileInput.addEventListener('change', _ => {
    const file = fileInput.files[0]
    const reader = new FileReader()
    reader.onload = _ => process(reader.result, file.name)
    reader.readAsText(file)
  })
}

function start () {
  addSelectEvent()
  addFileEvent()
}

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
  fileContent = str
  const selectedRe = replaceData[selected].re
  const iterator = fileContent.matchAll(selectedRe)
  const arr = Array.from(iterator, (entry) => entry[0])
  arr.map(replaceData[selected].fn)
  saveFile(fileContent, fileName)
}

window.onload = start
