<script setup lang="ts" name="AddCard"></script>

<template>
  <div class="add-card">
    <PaymentInfo />
    <CardInfoEdit />
    <Certificate />
  </div>
</template>

<style lang="scss" scoped>
.add-card {
  display: flex;
  width: 100%;
  padding: 24px 40px;
  flex-direction: column;
}
@media (max-width: 540px) {
  .add-card {
    padding: 18px;
  }
}
</style>
