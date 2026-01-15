export type Agent = {
  id: string
  name: string
}

export const agents: Agent[] = [
  { id: "m10-1", name: "Angelica Orain Cleofe" },
  { id: "m10-2", name: "Kristina Francia Daquioag" },
  { id: "m10-3", name: "Mary Ann Luna Picaso" },
  { id: "m10-4", name: "Homer San andres Reyes" },
  { id: "m10-5", name: "Allen Lindog Damot" },
]

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id.toLowerCase() === id.toLowerCase())
}
