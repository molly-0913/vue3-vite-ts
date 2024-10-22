<script setup lang="ts" name="To3dsModel">
import type { ComponentInternalInstance } from 'vue'
const router = useRouter()
const nuveiFormRef = ref<HTMLFormElement>()

const show3Ds = ref(false)
const dsUrl = ref('')
const isNuveiVal = ref(false)
const nuveiCreqVal = ref('')
const { proxy } = getCurrentInstance() as ComponentInternalInstance
function to3Ds() {
  show3Ds.value = false
  if (isNuveiVal.value) {
    nuveiFormRef.value && nuveiFormRef.value.submit()
  } else {
    window.open(dsUrl.value, '_black')
  }
}

onMounted(() => {
  proxy?.mittBus.on('to3DsBus', (obj: { url: string; isNuvei?: boolean; nuveiCreq?: string }) => {
    dsUrl.value = obj.url
    isNuveiVal.value = obj.isNuvei || false
    nuveiCreqVal.value = obj.nuveiCreq || ''
    show3Ds.value = true
  })
})

onUnmounted(() => {
  proxy?.mittBus.off('to3DsBus')
})
</script>

<template>
  <Teleport to="#app">
    <el-dialog
      class="normal-dialog"
      :center="true"
      v-model="show3Ds"
      :title="$t('leave_to_pay')"
      width="320px"
      :show-close="false"
      :close-on-click-modal="false"
      @closed="
        () => {
          router.push('/order/detail')
          router.removeRoute('CounterIndex')
        }
      "
    >
      <form
        v-if="isNuveiVal"
        ref="nuveiFormRef"
        id="paymentForm"
        method="POST"
        target="_blank"
        :action="dsUrl"
      >
        <input type="hidden" id="creq" name="creq" :value="nuveiCreqVal" />
        <input type="submit" value="" />
      </form>
      <template #footer>
        <span class="dialog-footer">
          <div class="kyc-button">
            <el-button
              class="submit-button normal-dialog-btn"
              style="width: 200px"
              type="primary"
              @click="to3Ds"
              >{{ $t('elastic_go_now') }}</el-button
            >
          </div>
        </span>
      </template>
    </el-dialog>
  </Teleport>
</template>

<style lang="scss" scoped></style>
