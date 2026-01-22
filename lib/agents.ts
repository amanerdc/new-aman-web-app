export type Agent = {
  id: string
  name: string
  brokerage: string
  classification: string
  team: string
}

export const agents: Agent[] = [
  // ALPHA
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
  { id: "a20-4", name: "Hana Beltran", brokerage: "Audjean Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a20-5", name: "Arnold Veluz Corre", brokerage: "Audjean Realty", classification: "Salesperson", team: "Alpha" },

// Deocrats Realty
  { id: "a30-1", name: "Virginia F. Albao", brokerage: "Deocrats Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a30-2", name: "Kristine F. Albao", brokerage: "Deocrats Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a30-3", name: "Angelica S. De Castro", brokerage: "Deocrats Realty", classification: "Broker", team: "Alpha" },

// Dezhomes Realty
  { id: "a40-1", name: "Lanie I. Sabaybay", brokerage: "Dezhomes Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a40-2", name: "Bernadette P. Ulep", brokerage: "Dezhomes Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a40-3", name: "Francia G. Dematera", brokerage: "Dezhomes Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a40-4", name: "Josie T. Aguila", brokerage: "Dezhomes Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a40-5", name: "Francia G. Dematera", brokerage: "Dezhomes Realty", classification: "Salesperson", team: "Alpha" },


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
  { id: "a70-2", name: "Viva Francia A. Rojo", brokerage: "Viva Realm Realty",classification: "Broker", team: "Alpha" },

  // Cariaga Realty
  { id: "a80-1", name: "Rowella P. Cariaga", brokerage: "Cariaga Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a80-2", name: "Diana Jane A. Peñaredondo", brokerage: "Cariaga Realty", classification: "Salesperson", team: "Alpha" },
  { id: "a80-3", name: "Noel D. Aldiano", brokerage: "Cariaga Realty", classification: "Salesperson", team: "Alpha" },

  // Giya Realty Services
  { id: "a90-1", name: "Maricel B. Adan", brokerage: "Giya Realty Services", classification: "Broker", team: "Alpha" },

  // MAVERICKS
  // De Laber Realty and Mktg
  { id: "m10-1", name: "Ma. Lourdes B. Aure", brokerage: "De Laber Realty and Mktg", classification: "Salesperson", team: "Mavericks" },
  { id: "m10-2", name: "Anin D. Mangente", brokerage: "De Laber Realty and Mktg", classification: "Salesperson", team: "Mavericks" },
  { id: "m10-3", name: "Charlize C. Chavez", brokerage: "De Laber Realty and Mktg", classification: "Salesperson", team: "Mavericks" },
  { id: "m10-4", name: "Roselyn C. Chavez", brokerage: "De Laber Realty and Mktg", classification: "Salesperson", team: "Mavericks" },

  // Adeg & Co.REB 
  { id: "m20-1", name: "Edna C. De Chavez", brokerage: "Adeg & Co.REB ", classification: "Broker", team: "Mavericks" },
  { id: "m20-2", name: "Janice R. Ortañez", brokerage: "Adeg & Co.REB ", classification: "Salesperson", team: "Mavericks" },
  { id: "m20-3", name: "Maria Regina C. Avestruz", brokerage: "Adeg & Co.REB ", classification: "Salesperson", team: "Mavericks" },
  { id: "m20-4", name: "Shiena A. Avanceña", brokerage: "Adeg & Co.REB ", classification: "Broker", team: "Mavericks" },
  { id: "m20-5", name: "Freddie G. Gamba", brokerage: "Adeg & Co.REB ", classification: "Salesperson", team: "Mavericks" },
  { id: "m20-6", name: "Rey C. Rentoria", brokerage: "Adeg & Co.REB ", classification: "Salesperson", team: "Mavericks" },

  // TITANS
  // Young Achievers' Realty
  { id: "t10-1", name: "Jerwin A. Rojo", brokerage: "Young Achievers' Realty", classification: "Broker", team: "Titans" },

  // K-realty
  { id: "t20-1", name: "Jennifer U. Estrada", brokerage: "K-realty", classification: "Salesperson", team: "Titans" },

  // EDP968 Real Estate Services
  { id: "t30-1", name: "Maricar A. Llorin", brokerage: "EDP968 Real Estate Services", classification: "Salesperson", team: "Titans" }
]

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id.toLowerCase() === id.toLowerCase())
}
