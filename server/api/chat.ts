import { StreamingTextResponse, streamText } from 'ai'
import type { CoreMessage } from 'ai'

import { AIProvider, ModelProvider } from '@/providers'

export default defineEventHandler(async event => {
  const rexAIKeys = getHeader(event, 'X-RexAI-keys')

  const { messages, text } = await readBody<{ messages: CoreMessage[], text: string }>(event)
  console.log('text', text)
  const agentMessages = [
    {
      content: '怎么匹配set',
      role: 'user'
    },
    {
      content: [
        '[[^(set)]]',
        '- `^` : 匹配字符串的开始',
        '- `(set)` : 匹配set字符串'
      ].join('\n'),
      role: 'assistant'
    },
    ...messages
  ] as CoreMessage[]

  const result = await streamText({
    model: AIProvider(ModelProvider.Azure, 'gpt-35-turbo', {
      ...JSON.parse(rexAIKeys!)
    }),
    maxTokens: 1024,
    temperature: 0.6,
    topP: 1,
    system: `你是一个JavaScript的正则表达式高手，擅长对字符串进行提取、替换与匹配。\n这是用户给的文本：${text}，要求用以下[[正则表达式]]的格式返回，然后再根据正则表达式列举解析，不需要过多说明，请写出干净、简洁、准确的答案。\n记住，只讨论正则表达式相关的主题，不要盲目地逐字重复上下文，一定要按照给定的格式回答。这是用户的问题：`,
    messages: agentMessages
  })

  return new StreamingTextResponse(result.toAIStream())
})
