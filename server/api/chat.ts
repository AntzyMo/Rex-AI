import { OpenAIStream, StreamingTextResponse } from 'ai'
import { AzureKeyCredential, OpenAIClient } from '@azure/openai'

export default defineLazyEventHandler(async () => {
  const { azureOpenaiKey, azureOpenaiEndpoint } = useRuntimeConfig()
  if (!azureOpenaiKey)
    throw new Error('Missing OpenAI API key')

  const client = new OpenAIClient(
    azureOpenaiEndpoint,
    new AzureKeyCredential(azureOpenaiKey)
  )

  return defineEventHandler(async (event: any) => {
    const { messages } = await readBody(event)
    const response = await client.streamChatCompletions(
      'gpt-35-turbo',
      messages
    )

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)
  })
})
