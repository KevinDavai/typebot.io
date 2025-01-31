import { parseVariablesInObject } from '@/features/variables'
import { sendGaEvent } from '@/lib/gtag'
import { IntegrationState } from '@/types'
import { GoogleAnalyticsBlock } from 'models'

export const executeGoogleAnalyticsBlock = async (
  block: GoogleAnalyticsBlock,
  { variables }: IntegrationState
) => {
  if (!block.options?.trackingId) return block.outgoingEdgeId
  const { default: initGoogleAnalytics } = await import('@/lib/gtag')
  await initGoogleAnalytics(block.options.trackingId)
  sendGaEvent(parseVariablesInObject(block.options, variables))
  return block.outgoingEdgeId
}
