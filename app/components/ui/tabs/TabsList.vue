<script setup lang="ts">
import type { TabsListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ref, onMounted, onUpdated } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsList } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
const listRef = ref<typeof TabsList | null>(null)
const indicatorRef = ref<HTMLElement | null>(null)
let currentPosition = { left: 0, top: 0, width: 0, height: 0 }

function updateIndicator() {
  if (!listRef.value || !indicatorRef.value) return

  const listEl = listRef.value.$el || listRef.value
  const activeTrigger = listEl.querySelector('[data-state="active"]')
  if (!activeTrigger) return

  const rect = activeTrigger.getBoundingClientRect()
  const listRect = listEl.getBoundingClientRect()

  const newPosition = {
    left: rect.left - listRect.left,
    top: rect.top - listRect.top,
    width: rect.width,
    height: rect.height,
  }

  // 液态滑动效果
  if (currentPosition.width > 0) {
    // 计算方向
    const direction = newPosition.left > currentPosition.left ? 1 : -1

    // 临时拉伸效果
    const stretchAmount =
      Math.abs(newPosition.left - currentPosition.left) * 0.3
    const tempWidth = currentPosition.width + stretchAmount * direction
    const tempLeft = currentPosition.left - (stretchAmount * direction) / 2

    // 应用临时拉伸
    indicatorRef.value.style.transition = 'none'
    indicatorRef.value.style.left = `${tempLeft}px`
    indicatorRef.value.style.width = `${tempWidth}px`

    // 触发重排
    indicatorRef.value.offsetWidth

    // 应用最终位置
    indicatorRef.value.style.transition =
      'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
  }

  // 应用最终位置
  indicatorRef.value.style.left = `${newPosition.left}px`
  indicatorRef.value.style.top = `${newPosition.top}px`
  indicatorRef.value.style.width = `${newPosition.width}px`
  indicatorRef.value.style.height = `${newPosition.height}px`

  // 更新当前位置
  currentPosition = newPosition
}

onMounted(() => {
  updateIndicator()
})

onUpdated(() => {
  updateIndicator()
})
</script>

<template>
  <TabsList
    ref="listRef"
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="
      cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] relative',
        props.class,
      )
    "
  >
    <div
      ref="indicatorRef"
      class="absolute rounded-md bg-background dark:bg-input/30 shadow-sm transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)"
      :style="{
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }"
    />
    <slot />
  </TabsList>
</template>
