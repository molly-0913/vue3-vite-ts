/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 2015
  },
  // 解决：index.vue组件命名问题（组件名称不合规范）
  rules: {
    'vue/multi-word-component-names': 0 //不强制要求组件命名
  },
  env: {
    es6: true, // 启用 ES6 全局变量
    browser: true, // 如果是浏览器环境，启用浏览器全局变量
    node: true // 如果是 Node.js 环境，启用 Node.js 全局变量
  }
}
