<script setup lang="ts">
  import markdownit from 'markdown-it'
  import { useChat } from '@ai-sdk/vue'

  import { aiRegex, content } from '@/logics'

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

  const mdcontent = [
    {
      content: '怎么匹配wasd',
      role: 'user',
      id: 'mlH3BYU'
    },
    {
      id: '6IymcbY',
      role: 'assistant',
      content: '[[\\bwasd\\b]]\n- `\\b` : 匹配单词的边界\n- `wasd` : 匹配wasd字符串',
      createdAt: '2024-06-12T07:50:26.853Z'
    }
  ]

  async function sendMessage(e: any) {
    handleSubmit(e, { options: { body: { text: content.value } } })
  }
</script>

<template>
  <div class="mx-5 h-full  min-w-433px" flex="~ 1 col" border="~ rounded gray-200">
    <div class=" bg-gray-100 px-2 py-1" flex="~ justify-between items-center">
      <div class="text-gray-500 gap-1.5 " flex="~ items-center">
        <div i-carbon:ai text-xl />
        <input class="w-100px">
      </div>
      <div flex="~ items-center">
        <button i-carbon:settings title="Setting" class="text-xl text-gray-500 hover:text-gray-600" />
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
              <div i-ri:openai-fill class="text-xl text-gray-800" />
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
  <div>123</div>
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
