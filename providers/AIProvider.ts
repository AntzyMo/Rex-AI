import { createAzure } from '@ai-sdk/azure'
import { createOpenAI } from '@ai-sdk/openai'

import { ModelProvider, type ModelProviderOptions } from './types'

export function AIProvider(
  provider: ModelProvider,
  deploymentModel: string,
  options: ModelProviderOptions
) {
  const runtimeConfig = useRuntimeConfig()

  switch (provider) {
    case ModelProvider.Azure:{
      const { azureApiKey, azureResourceName } = runtimeConfig
      const azure = createAzure({
        apiKey: options?.azureApiKey || azureApiKey,
        resourceName: options?.azureResourceName || azureResourceName
      })
      return azure(deploymentModel)
    }

    case ModelProvider.OpenAI:{
      const { openaiApiKey } = runtimeConfig
      const openai = createOpenAI({
        apiKey: options?.openaiApiKey || openaiApiKey,
        compatibility: 'strict'
      })
      return openai(deploymentModel)
    }
  }
}
