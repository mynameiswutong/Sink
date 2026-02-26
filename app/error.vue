<script setup lang="ts">
import { onMounted } from 'vue'
import errorImage from './assets/images/404.svg?raw'

// 加载时，弹出Alert
onMounted(() => {
  console.error('页面不存在')
})
</script>

<template>
  <NuxtLayout name="default">
    <div class="flex min-h-[60vh] items-center justify-center">
      <a
        class="
          mx-auto flex h-full w-full max-w-[600px] items-center justify-center
          [&_svg]:w-full
        "
        href="/"
        v-html="errorImage"
      />
    </div>
  </NuxtLayout>
</template>
