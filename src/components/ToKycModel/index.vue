<template>
  <Teleport to="#app">
    <el-dialog
      class="normal-dialog"
      :center="true"
      v-model="kycVisible"
      :title="$t('kyc_title')"
      width="320px"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="info-box">
        <div class="kyc-icon kyc-image"></div>
        <div class="kyc-text">{{ $t('kyc_info') }}</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <div class="kyc-button">
            <div class="kyc-warn-info">{{ $t('kyc_warn') }}</div>
            <el-button class="submit-button normal-dialog-btn" type="primary" @click="toDoKyc">{{
              $t('get_verified')
            }}</el-button>
          </div>
        </span>
      </template>
    </el-dialog>
  </Teleport>
</template>

<script setup lang="ts" name="ToKycModel">
import { useCounterStore } from '@/stores/counter'

const kycVisible = ref(false)

const route = useRoute()
const router = useRouter()

const { userInfo } = storeToRefs(useCounterStore())

function toDoKyc() {
  kycVisible.value = false
  router.push('/kyc-sumsub')
}

watch(
  () => route.name,
  (newVal, oldVal) => {
    if (newVal !== 'Welcome' && newVal !== 'KycSumsub') {
      if (userInfo.value.needKyc) {
        kycVisible.value = true
      }
    }
  }
)
</script>

<style lang="scss" scoped>
.kyc-button {
  padding: 0 10px;
  .kyc-warn-info {
    color: var(--text-info-color);
    font-size: 12px;
    // line-height: 14px;
    padding: 4px 0px;
  }
}
.info-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  .kyc-text {
    color: var(--kyc-text-color);
    margin-top: 6px;
  }
}
.kyc-icon {
  height: 80px;
  width: 80px;
  background-size: 80px 80px;
}
</style>
