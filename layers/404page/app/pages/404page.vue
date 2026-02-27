<script setup lang="ts">
import errorImage from '~/assets/images/404.svg?url'

definePageMeta({
  layout: '404page',
})
</script>

<template>
  <object
    type="image/svg+xml"
    :data="errorImage"
    class="
      mx-auto flex h-auto w-full max-w-[530px] items-center justify-center
      [&_svg]:w-full
    "
    aria-label="404 Not Found"
    suppressHydrationWarning
  />
</template>

<style scoped>
/* Add any additional styles here */
</style>
