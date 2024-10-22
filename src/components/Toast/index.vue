<template>
  <transition name="fade">
    <div class="toast-content" v-if="showToast">
      <div>
        <img
          v-if="type !== 'info'"
          width="16px"
          :src="type === 'success' ? successIcon : type === 'warning' ? warninIcon : failIcon"
          alt=""
        />
        <span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import warninIcon from '@/assets/images/icons/toast_warning.png'
import successIcon from '@/assets/images/icons/toast_success.png'
import failIcon from '@/assets/images/icons/toast_fail.png'

const showToast = ref<boolean>(true)

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'info' // 'info' | 'success' | 'warning' | 'error'
  },
  duration: {
    type: Number,
    default: 1500 // 默认1.5秒
  }
})

onMounted(() => {
  setTimeout(() => {
    showToast.value = false
  }, props.duration)
})
</script>
<style lang="scss" scoped>
.toast-content {
  width: auto;
  height: auto;
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
    span {
      font-size: 14px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>
