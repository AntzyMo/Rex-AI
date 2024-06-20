<script setup lang="ts">
  import type { SelectItem } from './types'

  const props = defineProps<{
    list: SelectItem[]
  }>()
  const emit = defineEmits<{
    change: [value: SelectItem]
  }>()

  const modelValue = defineModel<string>()
  const isSelectOptionsOpen = ref(false)

  const selectedIdx = computed(() => {
    const idx = props.list.findIndex(item => item.value === modelValue.value)
    return idx === -1 ? 0 : idx
  })
  const selected = computed(() => props.list[selectedIdx.value])

  function selectClick(val: SelectItem) {
    modelValue.value = val.value
    isSelectOptionsOpen.value = false
    emit('change', val)
  }

  onMounted(() => {
    modelValue.value = props.list[0].value
  })
</script>

<template>
  <div class="relative">
    <div>
      <button
        class="w-full bg-white px-2 py-1.5 text-sm  text-gray-900   hover:bg-gray-50"
        flex="~ items-center gap-1.5 justify-between"
        border="~ gray-200 rounded-md"
        @click="isSelectOptionsOpen = true"
      >
        <div class="text-xs" flex="~ items-center gap-2">
          <span class="text-xs" :class="`${selected.icon}`" />
          <span>{{ selected.label }}</span>
        </div>
        <span i-carbon:chevron-down class="text-base text-gray-400" />
      </button>
    </div>
    <div
      v-if="isSelectOptionsOpen"
      class="absolute w-full z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <div class="py-1 grid gap-1">
        <button
          v-for="(item, index) in list"
          :key="item.key || item.value"
          class="mx-1 px-1.5 py-1  rounded hover:bg-gray-200/70 active:bg-gray-100 text-gray-700 overflow-hidden text-xs"
          flex="~ gap-2  items-center"
          :class="{ 'bg-gray-100': selectedIdx === index }"
          @click="selectClick(item)"
        >
          <span class="text-xs" :class="`${item.icon}`" />
          <span class="text-xs">{{ item.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
