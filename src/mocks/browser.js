import { setupWorker } from 'msw'
import {
  diffusionAPIs,
  favorabilityAPIs,
  hotkeywordAPIs,
  interactionAPIs,
  predictModuleAPIs,
  reputationAPIs,
  reputationModuleAPIs,
  socialAPIs,
  textlistAPIs,
  volumeAPIs,
  authAPIs,
} from './handlers'

// eslint-disable-next-line import/prefer-default-export
export const worker = setupWorker(
  ...diffusionAPIs,
  ...favorabilityAPIs,
  ...hotkeywordAPIs,
  ...interactionAPIs,
  ...predictModuleAPIs,
  ...reputationAPIs,
  ...reputationModuleAPIs,
  ...socialAPIs,
  ...textlistAPIs,
  ...volumeAPIs,
  ...authAPIs,
)
