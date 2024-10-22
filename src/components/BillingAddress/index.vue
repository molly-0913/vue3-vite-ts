<script setup lang="ts" name="BillingAddress">
import { validateCity, validateState, validateZipCode } from '@/utils/rules'
import { countries } from '@/utils/countries'
import { defaultBillingAddressForm } from '@/defaultValue'
import { useCounterStore } from '@/stores/counter'
import { useCommonStore } from '@/stores/common'

const { billingAddrInfo } = storeToRefs(useCounterStore())
const { lang } = storeToRefs(useCommonStore())

const showDrawer = ref(false)
const validateForm = reactive<BillingAddress>(Object.assign({}, defaultBillingAddressForm))

const validateRules = {
  country: [{ required: true, message: '', trigger: 'blur' }],
  state: [{ validator: validateState, trigger: 'blur' }],
  city: [{ validator: validateCity, trigger: 'blur' }],
  zipCode: [{ validator: validateZipCode, trigger: 'blur' }],
  address: [{ required: true, message: '', trigger: 'blur' }]
}

const disabled = ref(true)

const validateAddFormRef = ref<HTMLFormElement>() // 绑定表单元素

function submitForm() {
  validateAddFormRef.value &&
    validateAddFormRef.value.validate((valid: boolean) => {
      if (valid) {
        Object.assign(billingAddrInfo.value, validateForm)
        showDrawer.value = false
      } else {
        return false
      }
    })
}

function formValidateCountry() {
  validateAddFormRef.value && validateAddFormRef.value.validateField('country')
}

function formValidateHandler() {
  const valid = validateAddFormRef.value?.fields.every((item: any) => {
    return item.validateState === 'success'
  })
  disabled.value = !valid
}

function drawerOpened() {
  nextTick(() => {
    Object.assign(validateForm, billingAddrInfo.value)
    if (validateForm.address) {
      validateAddFormRef.value &&
        validateAddFormRef.value.validate((valid: boolean) => {
          disabled.value = !valid
        })
    }
  })
}

watch(
  () => lang.value,
  () => {
    validateAddFormRef.value && validateAddFormRef.value.resetFields()
  }
)
</script>

<template>
  <SvgIcon name="inputEdit" class="edit-icon" @click="showDrawer = !showDrawer" />
  <Teleport to="#app">
    <el-drawer
      :title="$t('card_information_title')"
      v-model="showDrawer"
      class="normal-drawer"
      direction="btt"
      destroy-on-close
      size="auto"
      @opened="drawerOpened"
    >
      <div class="el-drawer-content">
        <el-form
          :model="validateForm"
          ref="validateAddFormRef"
          @validate="formValidateHandler"
          class="normal-form"
          label-position="top"
          :rules="validateRules"
          :hide-required-asterisk="true"
        >
          <div class="inline-form">
            <el-form-item prop="country" :label="$t('card_information_country')">
              <el-select
                v-model="validateForm.country"
                filterable
                :placeholder="$t('card_information_choose_country')"
                popper-class="form-select"
                @blur="formValidateCountry"
              >
                <el-option
                  v-for="item in countries"
                  :key="item.countryCode2"
                  :label="`${item.mapDisplay}(${item.countryCode2})`"
                  :value="item.countryCode2"
                >
                  {{ item.mapDisplay }}({{ item.countryCode2 }})
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="state" :label="$t('card_information_state')">
              <el-input
                v-model="validateForm.state"
                :placeholder="$t('card_information_state')"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="city" :label="$t('card_information_city')">
              <el-input
                v-model="validateForm.city"
                :placeholder="$t('card_information_city')"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="zipCode" :label="$t('card_information_zip_code')">
              <el-input
                v-model="validateForm.zipCode"
                :placeholder="$t('card_information_zip_code')"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item prop="address" :label="$t('card_information_address')">
            <el-input
              v-model="validateForm.address"
              :placeholder="$t('card_information_residential_address')"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- :disabled="disabled" -->
      <el-button class="submit-button" v-waves :disabled="disabled" @click="submitForm">
        {{ $t('done') }}
      </el-button>
    </el-drawer>
  </Teleport>
</template>

<style lang="scss" scoped>
.edit-icon {
  color: var(--copy-bg-color) !important;
  height: 24px !important;
  width: 24px !important;
}
.billing-address {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
