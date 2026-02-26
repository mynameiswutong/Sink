<script setup lang="ts">
import errorImage from './assets/images/404.svg?raw'
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
