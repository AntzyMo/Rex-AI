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
      console.log('options', options)
      const azure = createAzure({
        apiKey: options?.azureApiKey || azureApiKey,
        resourceName: options?.azureResourceName || azureResourceName
      })
      return azure(deploymentModel)
    }

    case ModelProvider.OpenAI:{
      const openai = createOpenAI({
        compatibility: 'strict'
      })
      return openai(deploymentModel)
    }
  }
}
