import { azure } from '@ai-sdk/azure'
import { StreamingTextResponse, streamText } from 'ai'

export default defineLazyEventHandler(async () => {
  const { azureApiKey } = useRuntimeConfig()
  if (!azureApiKey)
    throw new Error('Missing OpenAI API key')

  return defineEventHandler(async (event: any) => {
    const { messages, text } = await readBody(event)
    const agentMessages = [
      {
        content: '你好',
        role: 'user'
      },
      {
        content: '请不要提问跟正则无关的问题',
        role: 'assistant'
      },
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
    ]

    const result = await streamText({
      model: azure('gpt-35-turbo'),
      maxTokens: 1024,
      temperature: 0.6,
      topP: 1,
      system: `你是一个JavaScript的正则表达式高手，擅长对字符串进行提取、替换与匹配。\n根据我提供给你的文本：${text}，要求用以下[[正则表达式]]的格式返回，然后再根据正则表达式列举解析，不需要过多说明，请写出干净、简洁、准确的答案。如果用户提问的问题跟正则表达式无关，直接回答“请不要提问与正则无关的问题”。\n记住，只讨论正则表达式相关的主题，不要盲目地逐字重复上下文，一定要按照给定的格式回答。这是用户的问题：`,
      messages: agentMessages
    })

    return new StreamingTextResponse(result.toAIStream())
  })
})
