export function loadCssById(url: string, callback: Function) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  const head = document.getElementsByTagName('head')[0]

  link.onload = function () {
    if (typeof callback === 'function') {
      callback(url)
    }
  }

  link.onerror = function () {
    alert('Failed to load css: ' + url)
    console.error('Failed to load css: ' + url)
  }

  head.appendChild(link)
}
