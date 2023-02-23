import { setupWorker } from 'msw'
import {
  diffustionAPIs,
  favorabilityAPIs,
  hotkeywordAPIs,
  interactionAPIs,
  predictModuleAPIs,
  reputationAPIs,
  reputationModuleAPIs,
  socialAPIs,
  textlistAPIs,
  volumeAPIs,
} from './handlers'

// eslint-disable-next-line import/prefer-default-export
export const worker = setupWorker(
  ...diffustionAPIs,
  ...favorabilityAPIs,
  ...hotkeywordAPIs,
  ...interactionAPIs,
  ...predictModuleAPIs,
  ...reputationAPIs,
  ...reputationModuleAPIs,
  ...socialAPIs,
  ...textlistAPIs,
  ...volumeAPIs,
)
