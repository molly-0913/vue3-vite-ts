import { createVNode, render } from 'vue'
import ToastComponent from '../components/Toast/index.vue'

const Toast = {
  show(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', duration = 1500) {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const vnode = createVNode(ToastComponent, { message, type })

    render(vnode, container)

    setTimeout(() => {
      render(null, container)
      document.body.removeChild(container)
    }, duration + 500)
  }
}

export default Toast
