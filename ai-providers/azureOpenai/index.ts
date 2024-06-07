import { OpenAIStream, StreamingTextResponse } from 'ai'
import { AzureKeyCredential, OpenAIClient } from '@azure/openai'

// Create an OpenAI API client
const client = new OpenAIClient(
  'https://YOUR-AZURE-OPENAI-ENDPOINT',
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY!)
)

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Ask Azure OpenAI for a streaming chat completion given the prompt
  const response = await client.streamChatCompletions(
    'YOUR_DEPLOYED_INSTANCE_NAME',
    messages
  )

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
