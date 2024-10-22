<script setup lang="ts" name="Payment"></script>

<template>
  <div class="payment">
    <PaymentInfo />
    <CurrentCard />
    <div class="certificate-fix">
      <Certificate />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.payment {
  display: flex;
  width: 100%;
  padding: 24px 40px;
  flex-direction: column;
}

.certificate-fix {
  position: absolute;
  width: calc(100% - 80px);
  bottom: 0;
}

@media (max-width: 540px) {
  .payment {
    padding: 18px;
  }
  .certificate-fix {
    width: calc(100% - 32px);
  }
}
</style>
