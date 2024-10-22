<script setup lang="ts" name="Certificate"></script>

<template>
  <div class="certificate">
    <div class="pci-image pci"></div>
    <div class="cloud-image cloud"></div>
  </div>
</template>

<style lang="scss" scoped>
.certificate {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  margin-bottom: 16px;
  .pci {
    height: 22px;
    width: 50px;
    background-size: 100% 100%;
  }
  .cloud {
    height: 22px;
    width: 50px;
    background-size: 100% 100%;
  }
  & > div + div {
    margin-left: 20px;
  }
}
</style>
