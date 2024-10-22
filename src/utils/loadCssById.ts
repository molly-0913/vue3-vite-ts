import { getLocal } from './storage'

export function loadCssById(callback: Function) {
  const appId: string = getLocal('appId') || 'A22'

  const cssMap: any = {
    A22: '/styles/a22.css',
    C18: '/styles/c18.css'
  }

  const url = cssMap[appId] || cssMap['C18']

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
