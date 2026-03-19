import { getAgents, getAgentById as getAgentByIdFromDb, getBrokerages } from '@/lib/db'

export type Agent = {
  id: string  // Auto-generated: brokerage_id + '-' + agent_number (read-only)
  name: string
  brokerage_id: string  // Foreign key to brokerages
  classification: 'Broker' | 'Salesperson'
  email: string
  contact_no: string
}

export type Brokerage = {
  id: string  // Primary key assigned by admin
  name: string
  head_broker: string
  contact_no: string
  team: 'alpha' | 'mavericks' | 'titans'
  created_at: string
  updated_at: string
}

// Cache for agents and brokerages data
let agentsCache: Agent[] | null = null
let brokeragesCache: Brokerage[] | null = null
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

export async function getAllBrokerages(): Promise<Brokerage[]> {
  const now = Date.now()
  
  // Return cached data if still valid
  if (brokeragesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return brokeragesCache
  }
  
  // Fetch fresh data from database
  const brokerages = await getBrokerages()
  brokeragesCache = brokerages
  cacheTimestamp = now
  return brokerages
}
