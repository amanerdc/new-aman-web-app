export type Agent = {
  id: string
  name: string
}

export const agents: Agent[] = [
  { id: "t10-1", name: "Angelica O. Cleofe" },
  { id: "t10-2", name: "Kristina Francia G. Daquioag" },
  { id: "t10-3", name: "Mary Ann L. Picaso" },
  { id: "t10-4", name: "Homer S.A. Reyes" },
  { id: "t10-5", name: "Allen L. Damot" },
  { id: "t10-6", name: "Marison M. Comia" },
  { id: "t10-7", name: "Analen S. Roa" },
  { id: "t10-8", name: "Angel P. Pante" },
  { id: "t10-9", name: "Mariben C. Pante" },
  { id: "t10-10", name: "Shania T. Aman" },
  { id: "t10-11", name: "Armando L. Aman" },
  { id: "t10-12", name: "Cheryl D.S. Rabano" },
  { id: "t10-13", name: "Virginia F. Albao" },
  { id: "t10-14", name: "Kristine F. Albao" },
  { id: "t10-15", name: "Lanie I. Sabaybay" },
  { id: "t10-16", name: "Bernadette P. Ulep" },
  { id: "t10-17", name: "Francia G. Dematera" },
  { id: "t10-18", name: "Josie T. Aguila" },
  { id: "t10-19", name: "Roderick A. Rojo" },
  { id: "t10-20", name: "Roden A. Rojo" },
  { id: "t10-21", name: "Eva A. Rojo" },
  { id: "t10-22", name: "Diana Angelica A. Rojo" },
  { id: "t10-23", name: "Rolan L. Son" },
  { id: "t10-24", name: "Michelle Rose P. Tubig" },
  { id: "t10-25", name: "Jonalyn L. Arcilla" },
  { id: "t10-26", name: "Regina Vilma A. Guevera" },
  { id: "t10-27", name: "Allan D. Remoquillo" },
  { id: "t10-28", name: "Roda M. Rebellion" },
  { id: "t10-29", name: "Allene V. Oliver" },
  { id: "t10-30", name: "Jose M. Bisana" },
  { id: "t10-31", name: "Debbie G. Bolina" },
  { id: "t10-32", name: "Elizabeth F. Dialogo" },
  { id: "t10-33", name: "Dianna F. Reyes" },
  { id: "t10-34", name: "Cristy B. Santos" },
  { id: "t10-35", name: "Liberty M. Nabo" },
  { id: "t10-36", name: "Loida J. Yuson" },
  { id: "t10-37", name: "Emmanuel L. Magallona" },
  { id: "t10-38", name: "Viva Francia A. Rojo" }
]

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id.toLowerCase() === id.toLowerCase())
}
