<script setup lang="ts">
  import { useChat } from 'ai/vue'

  const { messages, data, input, handleSubmit } = useChat()

  const MAX_TEXTAREA_HEIGHT = 148
  const textareaHeight = ref('auto')
  const textareaRef = ref<HTMLTextAreaElement | null>()
  async function autoScrollHeight() {
    textareaHeight.value = 'auto'
    await nextTick()
    const height = textareaRef.value!.scrollHeight
    textareaHeight.value = height > MAX_TEXTAREA_HEIGHT ? `${MAX_TEXTAREA_HEIGHT}px` : `${height}px`
  }

  watch(messages, val => {
    console.log('val', val)
  })
  watch(data, val => {
    console.log('data', val)
  })
</script>

<template>
  <div class="mx-5 h-full" flex="~ 1 col" border="~ rounded gray-200">
    <div class=" bg-gray-100 px-2" flex="~ justify-between items-center">
      <div class="text-gray-500 gap-1.5 " flex="~ items-center">
        <div i-carbon:ai text-xl />
        <input class="w-100px">
      </div>
      <div>
        <button i-carbon:overflow-menu-horizontal class="text-xl text-gray-500" />
      </div>
    </div>
    <div class="overflow-hidden overflow-y-auto px-2 py-4 text-sm gap-7 scrollbar-lite scrollbar-track-radius-0!" flex="~ 1 col">
      <div
        v-for="m in messages"
        :key="m.id"
        class="whitespace-pre-wrap"
      >
        <!-- AI Area -->
        <div v-if="m.role !== 'user'" flex="~ gap-3 ">
          <div>
            <div class="p-1" border="~  rounded-full gray-200">
              <div i-ri:openai-fill class="text-xl text-gray-800" />
            </div>
          </div>
          <div class="mt-1.5">
            <span>{{ m.content }}</span>
          </div>
        </div>
        <!-- User Area -->
        <div v-else class="text-end">
          <div>
            <span class="bg-gray-100/60 px-3 py-2 rounded-md">{{ m.content }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="p-3" border-t="~ gray-200">
      <div flex="~ items-end" class="gap-1 p-1" border="~ rounded gray-200">
        <textarea
          ref="textareaRef"
          v-model="input"
          rows="1"
          :style="{ height: textareaHeight }"
          class="w-full flex-1 px-2 py-1  overflow-y-auto outline-none text-sm  resize-none"
          placeholder="your meaasge..."
          @input="autoScrollHeight"
          @keydown.enter="handleSubmit"
        />
        <div flex="~ items-center justify-end">
          <button i-carbon:send-alt class="text-2xl text-gray-500 bg-gray-600" />
        </div>
      </div>
    </div>
  </div>
</template>
