<template>
  <el-dropdown popper-class="lang-select" @command="commandHandler" placement="bottom-end">
    <div class="lang-btn">
      <SvgIcon name="global" class="global-icon" />
      <div class="lang-char">{{ showLangChar }}</div>
      <SvgIcon name="langAllow" class="allow-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :class="{
            'is-select': lang === 'ja'
          }"
          :disabled="lang === 'ja'"
          command="ja"
        >
          日本語
        </el-dropdown-item>
        <el-dropdown-item
          :class="{
            'is-select': lang === 'en'
          }"
          :disabled="lang === 'en'"
          command="en"
        >
          English
        </el-dropdown-item>
        <el-dropdown-item
          :class="{
            'is-select': lang === 'zh'
          }"
          :disabled="lang === 'zh'"
          command="zh"
        >
          繁體中文
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="LangSelect">
import { useCommonStore } from '@/stores/common'
import { setLocal } from '@/utils/storage'
const { lang, showLangChar } = storeToRefs(useCommonStore())
const { proxy } = getCurrentInstance() as any
function commandHandler(value: string) {
  proxy.$i18n.locale = value
  lang.value = value
  setLocal('lang', value)
}
</script>

<style lang="scss" scoped>
.lang-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.global-icon {
  color: var(--global-icon-color) !important;
  height: 17px !important;
  width: 17px !important;
}

.lang-char {
  min-width: 28px;
  color: var(--global-icon-color);
  font-size: 14px;
  font-weight: 400;
  text-align: right;
  padding: 4px;
}

.allow-icon {
  color: var(--lang-allow-icon-color) !important;
  height: 12px !important;
  width: 12px !important;
}
</style>
