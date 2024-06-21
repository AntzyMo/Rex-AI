<script setup lang="ts">
  import TheSearch from './TheSearch.vue'

  const theSearchRef = ref<InstanceType<typeof TheSearch> | null>()
  const { height } = useElementSize(theSearchRef)
  const matchsAreaHeight = computed(() => `calc(100% - ${height.value}px)`)
</script>

<template>
  <TheSearch ref="theSearchRef" />
  <div :style="{ height: matchsAreaHeight }">
    <TheMatchs />
  </div>
</template>
