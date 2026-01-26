import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { modelHouseSeries } from './data'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findUnitByDisplayName(displayName: string) {
  // Parse display name like "Jill 108 - Basic"
  const parts = displayName.split(' - ')
  if (parts.length !== 2) return null

  const [seriesNamePart, unitName] = parts

  // Find the series that matches (series name might have "Series" suffix)
  for (const series of Object.values(modelHouseSeries)) {
    if (series.name === seriesNamePart || series.name === seriesNamePart + ' Series') {
      // Find the unit within the series
      const unit = series.units.find(u => u.name === unitName)
      if (unit) {
        return { unit, series }
      }
    }
  }

  return null
}
