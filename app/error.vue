<script setup lang="ts">
import type { NuxtError } from '#app'
import { onMounted } from 'vue'
import errorImage from './assets/images/404.svg?raw'

const props = defineProps({
  error: Object as () => NuxtError,
})

onMounted(() => {
  console.error('页面不存在:', props.error)
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
