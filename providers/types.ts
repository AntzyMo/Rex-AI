interface AzureProviderOptions {
  azureApiKey: string
  azureResourceName: string
}
interface OpenAIProviderOptions {
  openaiApiKey: string
}
export type ModelProviderOptions = AzureProviderOptions & OpenAIProviderOptions

export enum ModelProvider {
  Azure = 'azure',
  OpenAI = 'openai'
}
