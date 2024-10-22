import type { MessageParams } from 'element-plus'

function messageMixin(options: MessageParams) {
  const messageDefaultConfig: MessageParams = {
    appendTo: document.getElementById('app')!,
    offset: document.getElementById('app')!.clientHeight / 2 - 60,
    customClass: 'custom-message'
  }
  return Object.assign({}, messageDefaultConfig, options)
}

export default messageMixin
