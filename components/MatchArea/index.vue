<script setup lang="ts">
  import TheSearch from './TheSearch.vue'

  const theSearchRef = ref<InstanceType<typeof TheSearch> | null>()
  const { height } = useElementSize(theSearchRef)
  const matchsAreaHeight = computed(() => `calc(95% - ${height.value}px)`)
</script>

<template>
  <TheSearch ref="theSearchRef" />
  <div :style="{ height: matchsAreaHeight }">
    <ClientOnly>
      <TheMatchs />
    </ClientOnly>
  </div>
</template>
