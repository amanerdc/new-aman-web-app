export type Agent = {
  id: string
  name: string
  brokerage: string
  classification: string
  team: string
}

export const agents: Agent[] = [
  // Aces & B Realty
  { id: "a10-1", name: "Angelica O. Cleofe", brokerage: "Aces & B Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a10-2", name: "Kristina Francia G. Daquioag", brokerage: "Aces & B Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a10-3", name: "Mary Ann L. Picaso", brokerage: "Aces & B Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a10-4", name: "Homer S.A. Reyes", brokerage: "Aces & B Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a10-5", name: "Allen L. Damot", brokerage: "Aces & B Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a10-6", name: "Marison M. Comia", brokerage: "Aces & B Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a10-7", name: "Analen S. Roa", brokerage: "Aces & B Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a10-8", name: "Angel P. Pante", brokerage: "Aces & B Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a10-9", name: "Mariben C. Pante", brokerage: "Aces & B Realty", classification: "Broker", team: "Alpha" },

// Audjean Realty
  { id: "a20-1", name: "Shania T. Aman", brokerage: "Audjean Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a20-2", name: "Armando L. Aman", brokerage: "Audjean Realty", classification: "Broker", team: "Alpha" },
  { id: "a20-3", name: "Cheryl D.S. Rabano", brokerage: "Audjean Realty", classification: "Salesperson", team: "Alpha" },

// Deocrats Realty
  { id: "a30-1", name: "Virginia F. Albao", brokerage: "Deocrats Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a30-2", name: "Kristine F. Albao", brokerage: "Deocrats Realty", classification: "Salesperson", team: "Alpha" },

// Dezhomes Realty
  { id: "a40-1", name: "Lanie I. Sabaybay", brokerage: "Dezhomes Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a40-2", name: "Bernadette P. Ulep", brokerage: "Dezhomes Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a40-3", name: "Francia G. Dematera", brokerage: "Dezhomes Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a40-4", name: "Josie T. Aguila", brokerage: "Dezhomes Realty", classification: "Salesperson", team: "Alpha" },

// Red Zeal Realty
  { id: "a50-1", name: "Roderick A. Rojo", brokerage: "Red Zeal Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a50-2", name: "Roden A. Rojo", brokerage: "Red Zeal Realty", classification: "Broker", team: "Alpha" },
  { id: "a50-3", name: "Eva A. Rojo", brokerage: "Red Zeal Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a50-4", name: "Diana Angelica A. Rojo", brokerage: "Red Zeal Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a50-5", name: "Rolan L. Son", brokerage: "Red Zeal Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a50-6", name: "Michelle Rose P. Tubig", brokerage: "Red Zeal Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a50-7", name: "Jonalyn L. Arcilla", brokerage: "Red Zeal Realty", classification: "Salesperson", team: "Alpha" },

// Sweetville Realty
  { id: "a60-1", name: "Regina Vilma A. Guevera", brokerage: "Sweetville Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a60-2", name: "Allan D. Remoquillo", brokerage: "Sweetville Realty", classification: "Broker", team: "Alpha" },
  { id: "a60-3", name: "Roda M. Rebellion", brokerage: "Sweetville Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a60-4", name: "Allene V. Oliver", brokerage: "Sweetville Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a60-5", name: "Jose M. Bisana", brokerage: "Sweetville Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a60-6", name: "Debbie G. Bolina", brokerage: "Sweetville Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a60-7", name: "Elizabeth F. Dialogo", brokerage: "Sweetville Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a60-8", name: "Dianna F. Reyes", brokerage: "Sweetville Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a60-9", name: "Cristy B. Santos", brokerage: "Sweetville Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a60-10", name: "Liberty M. Nabo", brokerage: "Sweetville Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a60-11", name: "Loida J. Yuson", brokerage: "Sweetville Realty", classification: "Salesperson", team: "Alpha" },

// Viva Realm Realty
  { id: "a70-1", name: "Emmanuel L. Magallona", brokerage: "Viva Realm Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a70-2", name: "Viva Francia A. Rojo", brokerage: "Viva Realm Realty",classification: "Broker", team: "Alpha" }
]

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id.toLowerCase() === id.toLowerCase())
}
