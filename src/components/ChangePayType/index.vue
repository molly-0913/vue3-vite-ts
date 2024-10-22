<script setup lang="ts" name="ChangePayType">
import { useCounterStore } from '@/stores/counter'
import { maskCreditCard } from '@/utils/parseTools'
import { getImageUrl, setPayTypeName } from '@/utils/common'
import { defaultBankItem } from '@/defaultValue'
import { deleteUserCard } from '@/api/naticPay'

const showDrawer = ref(false)

const deleteVisible = ref(false)

const emit = defineEmits(['change'])
const props = defineProps({
  useBankId: {
    type: Number
  }
})
const { bankList } = storeToRefs(useCounterStore())
const { getBankList } = useCounterStore()

const willDelBank = reactive<BankItem>(Object.assign({}, defaultBankItem))

function delBankById(bankItem: BankItem) {
  if (props.useBankId && +props.useBankId === +bankItem.id) {
    return
  }
  Object.assign(willDelBank, bankItem)
  deleteVisible.value = true
}

function changeBank(bankId: number) {
  if (props.useBankId && +props.useBankId === +bankId) {
    return
  }
  emit('change', bankId)
  showDrawer.value = false
}

const loading = ref(false)

async function doDelete() {
  loading.value = true
  deleteUserCard({ id: willDelBank.id })
    .then((res) => {
      if (res.data.head?.code === '0000') {
        getBankList()
      }
    })
    .finally(() => {
      loading.value = false
      deleteVisible.value = false
    })
}
</script>

<template>
  <el-button type="text" @click="showDrawer = !showDrawer">
    <span class="icon-color">{{ $t('card_add_change') }}</span>
    <SvgIcon name="arrowRight" class="icon-color" height="12px" width="12px" />
  </el-button>
  <Teleport to="#app">
    <el-drawer
      :title="$t('card_add_change')"
      v-model="showDrawer"
      class="normal-drawer"
      direction="btt"
      destroy-on-close
      size="auto"
    >
      <div class="el-drawer-content">
        <div
          v-for="bank in bankList"
          :key="bank.id"
          class="bank-item"
          :style="{ cursor: +bank.id === +useBankId! ? 'not-allowed' : 'pointer' }"
          @click="changeBank(bank.id)"
        >
          <img :src="getImageUrl(`icon${bank?.payType}`)" alt="" class="card-img" />
          <div>{{ bank.cardGroup || setPayTypeName(String(bank?.payType)) }}</div>
          <div class="card-number">{{ maskCreditCard(bank?.creditCardNo || '') }}</div>
          <div v-if="+bank.id === +useBankId!" class="current">{{ $t('current') }}</div>
          <SvgIcon
            v-if="+bank.id !== +useBankId!"
            @click.stop="delBankById(bank)"
            name="del"
            height="16px"
            width="16px"
            :style="{ cursor: +bank.id === +useBankId! ? 'not-allowed' : 'pointer' }"
          />
        </div>
      </div>
      <el-button
        v-if="bankList.length < 5"
        plain
        class="plain-button"
        v-waves
        :disabled="bankList.length >= 5"
        @click="() => $router.push('/counter/add-card')"
      >
        <div style="display: flex; align-items: center">
          <SvgIcon name="plus" class="plus-icon" />
          {{ $t('card_add_new') }}
        </div>
      </el-button>
    </el-drawer>

    <el-dialog
      class="normal-dialog"
      :center="true"
      v-model="deleteVisible"
      :title="$t('card_add_delete_content')"
      width="320px"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="info-box">
        <img :src="getImageUrl(`icon${willDelBank?.payType}`)" alt="" class="card-img" />
        <div class="card-number-dia">{{ maskCreditCard(willDelBank?.creditCardNo || '') }}</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <div>
            <el-button
              class="plain-button normal-dialog-btn normal-dialog-close-btn"
              @click="doDelete"
              :loading="loading"
            >
              {{ $t('card_add_delete_btn') }}
            </el-button>
          </div>
          <div>
            <el-button
              class="submit-button normal-dialog-btn"
              type="primary"
              :disabled="loading"
              @click="deleteVisible = false"
            >
              {{ $t('common_cancel') }}
            </el-button>
          </div>
        </span>
      </template>
    </el-dialog>
  </Teleport>
</template>

<style lang="scss" scoped>
.bank-item {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  .card-img {
    width: 26px;
    height: 16px;
    margin-right: 8px;
    box-shadow: 0 0 1.2px rgba(0, 0, 0, 0.4);
    border-radius: 1px;
  }
  .card-number {
    flex-grow: 1;
    padding: 0 8px;
    size: 12px;
  }
  & + .bank-item {
    margin-top: 14px;
  }
}
.icon-color {
  color: var(--other-icon-color) !important;
  margin-left: 4px;
  font-size: 12px;
}
.change-pay-type {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.plus-icon {
  color: var(--plain-text-color) !important;
  height: 24px !important;
  width: 24px !important;
}
.current {
  height: 20px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 12px;
  background-color: var(--brand-color);
  border-radius: 2px;
  color: #fff;
}
.info-box {
  flex-grow: 1;
  height: 44px;
  border-radius: 5px;
  background-color: var(--del-dia-bg-color);
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  .card-img {
    width: 26px;
    height: 16px;
  }
  .card-number-dia {
    flex-grow: 1;
    padding: 0 8px;
    size: 12px;
    color: var(--text-main-color);
  }
}
</style>
