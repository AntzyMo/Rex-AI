<script setup lang="ts">
  import markdownit from 'markdown-it'
  import { useChat } from '@ai-sdk/vue'
  import type { SelectItem } from '../UI/types'

  import { aiRegex, content, isModelSettingOpen, modelSetting } from '@/logics'

  const textareaRef = ref<HTMLTextAreaElement | null>()
  const { targetHeight, autoScrollHeight } = useAutoHeight(textareaRef, { maxHeight: 148 })

  const scrollRef = ref<HTMLDivElement | null>()
  const { scrollToBottom } = useScroll(scrollRef)

  const { messages, input, handleSubmit } = useChat()

  const md = markdownit()
  function mdit(text: string) {
    return md.render(text)
  }

  watch(messages, data => {
    scrollToBottom()
    const { content, role } = data.at(-1) ?? {}
    if (role === 'assistant') {
      const matchAi = [...content!.matchAll(/\[\[(.*?)\]\]/g)]?.[0]

      if (matchAi?.[1]) {
        aiRegex.value = [...new Set([...aiRegex.value, matchAi?.[1]])]
      }
    }
  })

  const modelSelectValue = ref('')
  const modelList = [{
    label: 'gpt-3.5-turbo',
    value: 'Azure gpt-35-turbo',
    icon: 'i-simple-icons:microsoftazure'
  }, {
    label: 'gpt-3.5-turbo',
    value: 'OpenAI gpt-35-turbo',
    icon: 'i-simple-icons:openai'
  }] as SelectItem[]

  function sendMessage(e: Event) {
    const [provider, model] = modelSelectValue.value.split(' ')
    handleSubmit(e, {
      options: {
        headers: {
          'X-RexAI-keys': JSON.stringify(modelSetting.value)
        },
        body: { text: content.value, provider, model }
      }
    })
  }
</script>

<template>
  <div class="mx-5 h-full" flex="~ 1 col" border="~ rounded gray-200">
    <div class=" bg-gray-100 px-2 py-1" flex="~ justify-between items-center">
      <div class="text-gray-500 gap-1.5 " flex="~ items-center">
        <div i-carbon:ai text-xl />
        <Select v-model="modelSelectValue" :list="modelList" />
      </div>
      <div flex="~ items-center">
        <button
          i-carbon:settings
          title="Open Setting"
          class="text-xl text-gray-500 hover:text-gray-600"
          @click="isModelSettingOpen = true"
        />
      </div>
    </div>
    <div
      ref="scrollRef"
      class="overflow-hidden overflow-y-auto px-2 py-4 text-sm gap-7 scrollbar-lite scrollbar-track-radius-0! scroll-smooth"
      flex="~ 1 col"
    >
      <div v-for="m in messages" :key="m.id">
        <!-- AI Area -->
        <div v-if="m.role !== 'user'" flex="~ gap-3 ">
          <div>
            <div class="p-1" border="~  rounded-full gray-200">
              <div i-simple-icons:openai class="text-xl text-gray-800" />
            </div>
          </div>
          <div class="mt-1.5 prose md-content" v-html="mdit(m.content)" />
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
      <div flex="~ items-end" class="gap-1  transition py-1 pr-1" border="~ rounded gray-200 focus-within:gray-400/80">
        <textarea
          ref="textareaRef"
          v-model="input"
          rows="1"
          :style="{ height: targetHeight }"
          class="w-full flex-1 px-2 py-1 self-center  overflow-y-auto outline-none text-sm  resize-none"
          placeholder="your meaasge..."
          @input="autoScrollHeight"
          @keydown.enter="e => sendMessage(e)"
        />
        <div flex="~ items-center justify-end">
          <IconButton
            :icon="[
              'i-carbon:send-alt text-xl text-gray-500',
              { 'text-white!': input.length },
            ]"
            :class="{
              'bg-black/90! text-white!': input.length,
            }"
            @click="e => sendMessage(e)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.md-content{
  p{
    @apply w-full mt-0
  }

  ul{
    @apply leading-3.5 -mt-2
  }
}
</style>
