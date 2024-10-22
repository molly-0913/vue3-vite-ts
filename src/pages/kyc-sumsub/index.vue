<template>
  <div id="sumsub-websdk-container"></div>
</template>
<script setup lang="ts" name="KycSumsub">
import { doKyc } from '@/api/kyc'
import { useCounterStore } from '@/stores/counter'
import snsWebSdk from '@sumsub/websdk'
const { initCounter } = useCounterStore()

const getNewAccessToken = async (): Promise<string> => {
  console.log('验证是否过期会自动调用？')

  try {
    return new Promise((resolve, reject) => {
      doKyc().then((res) => {
        if (res.data.head?.code === '0000') {
          resolve(res.data.body.token)
        } else {
          reject(new Error('error------'))
        }
      })
    })
  } catch (error) {
    throw new Error('error------')
  }
}

const launchWebSdk = async (
  applicantEmail?: string,
  applicantPhone?: string,
  customI18nMessages?: any
) => {
  const accessToken = await getNewAccessToken() // 获取初始 token

  let snsWebSdkInstance = snsWebSdk
    .init(accessToken, async () => {
      const newToken = await getNewAccessToken() // token 过期 获取新的token
      return newToken
    })
    .withConf({
      lang: 'en', // 语言
      email: applicantEmail, // 申请人邮箱（非必传）
      phone: applicantPhone, // 申请人手机号 （非必传）
      theme: 'light' // "dark" or "light" 主题色
    })
    .withOptions({
      addViewportTag: false,
      adaptIframeHeight: true
    })
    .on('idCheck.onStepCompleted', (payload: any) => {
      console.log('onStepCompleted', payload)
      console.log('监听kyc完成步骤，可调用kyc 状态接口 同步kyc状态')
      initCounter()
    })
    .on('idCheck.onError', (error: any) => {
      console.error('onError', error)
    })
    .build()

  snsWebSdkInstance.launch('#sumsub-websdk-container')
}

onMounted(() => {
  launchWebSdk()
})
</script>
<style lang="scss" scoped>
#sumsub-websdk-container {
  height: 740px;
  background: #fff;
}
@media (max-width: 540px) {
  #sumsub-websdk-container {
    height: 100vh;
  }
}
</style>
