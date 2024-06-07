<script setup lang="ts">
  import { Pane, Splitpanes } from 'splitpanes'
  </script>

<template>
  <div class="h-100vh py-3">
    <NavBar />
    <Splitpanes class="h-95%">
      <Pane>
        <MatchArea />
      </Pane>
      <Pane size="40">
        <AIArea />
      </Pane>
    </Splitpanes>
  </div>
</template>
