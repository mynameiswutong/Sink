<script setup lang="ts">
import type { ShapeType } from 'qr-code-styling'
import { Download } from 'lucide-vue-next'
import QRCodeStyling from 'qr-code-styling'

const props = withDefaults(
  defineProps<{
    data: string
    image?: string
  }>(),
  {
    image: '',
  },
)
const color = ref('#000000')
const shape = ref<ShapeType>('square')
const bgTransparent = ref<boolean>(true)
const options = {
  width: 256,
  height: 256,
  shape: 'square' as const, // 二维码形状, 可选值: 'circle' | 'square'
  data: props.data,
  type: 'svg' as const, // 二维码类型, 可选值: 'svg' | 'canvas'
  margin: 10,
  qrOptions: {
    typeNumber: 0 as const,
    mode: 'Byte' as const,
    errorCorrectionLevel: 'Q' as const,
  },
  imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 2 },
  dotsOptions: { type: 'rounded' as const, color: '#000000' },
  backgroundOptions: { color: 'transparent' }, // 'transparent' | '#ffffff'
  image: props.image,
  dotsOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#6a1a4c',
      color2: '#6a1a4c',
      rotation: '0',
    },
  },
  cornersSquareOptions: { type: 'dot' as const, color: '#000000' },
  cornersSquareOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#000000',
      color2: '#000000',
      rotation: '0',
    },
  },
  cornersDotOptions: { type: 'dot' as const, color: '#000000' },
  cornersDotOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#000000',
      color2: '#000000',
      rotation: '0',
    },
  },
  backgroundOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: '#ffffff',
      color2: '#ffffff',
      rotation: '0',
    },
  },
}

const qrCode = new QRCodeStyling(options)
const qrCodeEl = useTemplateRef<HTMLElement>('qrCodeEl')

function updateColor(newColor: string) {
  qrCode.update({
    dotsOptions: { type: 'rounded' as const, color: newColor },
    cornersSquareOptions: { type: 'dot' as const, color: newColor },
    cornersDotOptions: { type: 'dot' as const, color: newColor },
  })
}

watch(color, (newColor) => {
  updateColor(newColor)
})

function updateShape(newShape: ShapeType) {
  qrCode.update({
    shape: newShape,
  })
}

watch(shape, (newShape) => {
  updateShape(newShape)
})

watch(bgTransparent, (newBgTransparent) => {
  qrCode.update({
    backgroundOptions: { color: newBgTransparent ? 'transparent' : '#ffffff' },
  })
})

function downloadQRCode() {
  const slug = props.data.split('/').pop()
  qrCode.download({
    extension: 'png',
    name: `qr_${slug}`,
  })
}

onMounted(() => {
  if (qrCodeEl.value) {
    qrCode.append(qrCodeEl.value as unknown as HTMLElement)
  }
})
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Transition name="qr-fade" mode="out-in">
      <div
        v-if="data"
        ref="qrCodeEl"
        :data-text="data"
        class="rounded-lg bg-white p-1"
      />
    </Transition>
    <div class="flex flex-col items-center gap-2">
      <div class="flex items-center gap-4">
        <div class="relative flex items-center">
          <div
            class="
              h-8 w-8 cursor-pointer overflow-hidden rounded-full border
              border-gray-300
              dark:border-gray-600
            "
            :style="{ backgroundColor: color }"
            :title="$t('links.change_qr_color')"
          >
            <input
              v-model="color"
              type="color"
              class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              :title="$t('links.change_qr_color')"
            >
          </div>
        </div>
        <Tabs v-model="shape" default-value="square">
          <div class="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="square" class="block">
                {{ $t('home.features.qr_code.square') }}
              </TabsTrigger>
              <TabsTrigger value="circle" class="block">
                {{ $t('home.features.qr_code.circle') }}
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <div class="flex items-center gap-2">
          <label
            class="
              pr-2 text-sm leading-none text-stone-700 select-none
              dark:text-white
            "
            for="airplane-mode"
          >
            {{ $t('home.features.qr_code.background') }}
          </label>

          <Switch
            id="background-switch"
            :model-value="bgTransparent"
            @update:model-value="bgTransparent = $event"
          />
        </div>
      </div>
      <Button variant="outline" size="sm" @click="downloadQRCode">
        <Download class="h-4 w-4" />
        {{ $t('links.download_qr_code') }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
.qr-fade-enter-active,
.qr-fade-leave-active {
  transition: opacity 0.3s ease;
}

.qr-fade-enter-from,
.qr-fade-leave-to {
  opacity: 0;
}
</style>
