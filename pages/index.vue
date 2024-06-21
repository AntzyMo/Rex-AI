<script setup lang="ts">
  import { Pane, Splitpanes } from 'splitpanes'

  import { isModelSettingOpen } from '@/logics'
</script>

<template>
  <div class="h-100vh py-3">
    <NavBar />
    <div flex="~ 1" class="h-95%">
      <Splitpanes>
        <Pane>
          <MatchArea />
        </Pane>
        <Pane size="40">
          <AIArea />
        </Pane>
      </Splitpanes>
      <Setting v-if="isModelSettingOpen" />
    </div>
  </div>
</template>
