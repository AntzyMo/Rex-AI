<script setup lang="ts">
  import 'splitpanes/dist/splitpanes.css'
  import { Pane, Splitpanes } from 'splitpanes'
</script>

<template>
  <div flex="~ col 1" class="h-100vh  overflow-hidden">
    <NavBar />
    <Splitpanes>
      <Pane flex="~ 1 col" class="">
        <MatchArea />
      </Pane>
      <Pane size="30">
        <AIArea />
      </Pane>
    </Splitpanes>
  </div>
</template>
