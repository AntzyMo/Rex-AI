interface AzureProviderOptions {
  azureApiKey: string
  azureResourceName: string
}
export type ModelProviderOptions = AzureProviderOptions

export enum ModelProvider {
  Azure = 'azure',
  OpenAI = 'openai'
}
