import { getAgents, getAgentById as getAgentByIdFromDb } from '@/lib/db'

export type Agent = {
  id: string
  name: string
  brokerage: string
  classification: string
  team: string
}

// Cache for agents data
let agentsCache: Agent[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getAllAgents(): Promise<Agent[]> {
  const now = Date.now()
  
  // Return cached data if still valid
  if (agentsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return agentsCache
  }
  
  // Fetch fresh data from database
  const agents = await getAgents()
  agentsCache = agents
  cacheTimestamp = now
  return agents
}

export async function getAgentById(id: string): Promise<Agent | undefined> {
  if (!id) return undefined
  const agent = await getAgentByIdFromDb(id)
  return agent
}
