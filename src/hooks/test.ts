import { reactive, onMounted, onUnmounted } from 'vue'
export default function testHooks() {
  const objSize = reactive({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const handleResize = () => {
    objSize.width = window.innerWidth
    objSize.height = window.innerHeight
  }

  onMounted(() => {
    console.log(objSize.width)
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    objSize
  }
}
