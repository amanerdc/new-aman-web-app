import { supabase } from '@/lib/supabase'

// Helper function to get developer color
function getDeveloperColor(developer: string): string {
  const colorMap: Record<string, string> = {
    'Aman Engineering': '#04009D',
    'Enjoy Realty & Development Corporation': '#65932D',
  }
  return colorMap[developer] || '#000000'
}

// Transform series data from snake_case to camelCase
function transformSeries(data: any) {
  return {
    ...data,
    floorArea: data.floor_area || data.floorArea,
    loftReady: data.loft_ready || data.loftReady,
    longDescription: data.long_description || data.longDescription,
    basePrice: data.base_price || data.basePrice,
    imageUrl: data.image_url || data.imageUrl,
    floorPlanImage: data.floor_plan_image || data.floorPlanImage,
  }
}

// Transform units data from snake_case to camelCase
function transformUnit(data: any) {
  return {
    ...data,
    seriesId: data.series_id || data.seriesId,
    isRfo: data.is_rfo || data.isRfo,
    lotOnlyPrice: data.lot_only_price || data.lotOnlyPrice,
    houseConstructionPrice: data.house_construction_price || data.houseConstructionPrice,
    floorPlanImage: data.floor_plan_image || data.floorPlanImage,
    imageUrl: data.image_url || data.imageUrl,
    floorPlanPdfId: data.floor_plan_pdf_id || data.floorPlanPdfId,
    reservationFee: data.reservation_fee || data.reservationFee,
    financingOptions: data.financing_options || data.financingOptions,
    downPaymentPercentage: data.down_payment_percentage || data.downPaymentPercentage,
    floorArea: data.floor_area || data.floorArea,
    completionDate: data.completion_date || data.completionDate,
    constructionProgress: data.construction_progress || data.constructionProgress,
  }
}

// Transform lot-only data from snake_case to camelCase
function transformLotOnly(data: any) {
  return {
    ...data,
    propertyOption: data.property_option || data.propertyOption,
    developerColor: getDeveloperColor(data.developer),
    lotArea: data.lot_area || data.lotArea,
    imageUrl: data.image_url || data.imageUrl,
    propertyType: data.property_type || data.propertyType,
    reservationFee: data.reservation_fee || data.reservationFee,
    financingOptions: data.financing_options || data.financingOptions,
    downPaymentPercentage: data.down_payment_percentage || data.downPaymentPercentage,
    downPaymentTerms: data.down_payment_terms || data.downPaymentTerms,
    utilities: (data.utilities || []).map((u: any) => typeof u === 'string' ? u : u),
    nearbyAmenities: (data.nearby_amenities || []).map((a: any) => typeof a === 'string' ? a : a),
  }
}

export async function getSeries() {
  try {
    const { data, error } = await supabase.from('series').select('*')
    if (error) {
      console.error('Error fetching series:', error.message || JSON.stringify(error))
      return []
    }
    return (data || []).map(transformSeries)
  } catch (err) {
    console.error('Error fetching series:', err)
    return []
  }
}

export async function getSeriesById(id: string) {
  try {
    const { data, error } = await supabase.from('series').select('*').eq('id', id).single()
    if (error) {
      console.error('Error fetching series:', error.message || JSON.stringify(error))
      return null
    }
    return data ? transformSeries(data) : null
  } catch (err) {
    console.error('Error fetching series:', err)
    return null
  }
}

export async function getUnits() {
  try {
    const { data, error } = await supabase.from('units').select('*')
    if (error) {
      console.error('Error fetching units:', error.message || JSON.stringify(error))
      return []
    }
    return (data || []).map(transformUnit)
  } catch (err) {
    console.error('Error fetching units:', err)
    return []
  }
}

export async function getUnitsBySeriesId(seriesId: string) {
  try {
    const { data, error } = await supabase.from('units').select('*').eq('series_id', seriesId)
    if (error) {
      console.error('Error fetching units:', error.message || JSON.stringify(error))
      return []
    }
    return (data || []).map(transformUnit)
  } catch (err) {
    console.error('Error fetching units:', err)
    return []
  }
}

export async function getUnitById(id: string) {
  try {
    const { data, error } = await supabase.from('units').select('*').eq('id', id).single()
    if (error) {
      console.error('Error fetching unit:', error.message || JSON.stringify(error))
      return null
    }
    return data ? transformUnit(data) : null
  } catch (err) {
    console.error('Error fetching unit:', err)
    return null
  }
}

export async function getLotOnlyProperties() {
  try {
    const { data, error } = await supabase.from('lot_only').select('*')
    if (error) {
      console.error('Error fetching lot-only:', error.message || JSON.stringify(error))
      return []
    }
    return (data || []).map(transformLotOnly)
  } catch (err) {
    console.error('Error fetching lot-only:', err)
    return []
  }
}

export async function getLotOnlyById(id: string) {
  try {
    const { data, error } = await supabase.from('lot_only').select('*').eq('id', id).single()
    if (error) {
      console.error('Error fetching lot-only:', error.message || JSON.stringify(error))
      return null
    }
    return data ? transformLotOnly(data) : null
  } catch (err) {
    console.error('Error fetching lot-only:', err)
    return null
  }
}

// Transform agents data from snake_case to camelCase
function transformAgent(data: any) {
  return {
    ...data,
    imageUrl: data.image_url || data.imageUrl,
  }
}

// Transform developers data from snake_case to camelCase
function transformDeveloper(data: any) {
  return {
    ...data,
    imageUrl: data.image_url || data.imageUrl,
  }
}

export async function getAgents() {
  try {
    const { data, error } = await supabase.from('agents').select('*')
    if (error) {
      console.error('Error fetching agents:', error.message || JSON.stringify(error))
      return []
    }
    return (data || []).map(transformAgent)
  } catch (err) {
    console.error('Error fetching agents:', err)
    return []
  }
}

export async function getAgentById(id: string) {
  try {
    const { data, error } = await supabase.from('agents').select('*').eq('id', id).single()
    if (error) {
      console.error('Error fetching agent:', error.message || JSON.stringify(error))
      return null
    }
    return data ? transformAgent(data) : null
  } catch (err) {
    console.error('Error fetching agent:', err)
    return null
  }
}

export async function getDevelopers() {
  try {
    const { data, error } = await supabase.from('developers').select('*')
    if (error) {
      console.error('Error fetching developers:', error.message || JSON.stringify(error))
      return []
    }
    return (data || []).map(transformDeveloper)
  } catch (err) {
    console.error('Error fetching developers:', err)
    return []
  }
}

export async function getDeveloperProjects(developerId?: string) {
  try {
    let query = supabase.from('developer_projects').select('*')
    if (developerId) {
      query = query.eq('developer_id', developerId)
    }
    const { data, error } = await query
    if (error) {
      console.error('Error fetching developer projects:', error.message || JSON.stringify(error))
      return []
    }
    return (data || []).map((item: any) => ({
      ...item,
      imageUrl: item.image_url || item.imageUrl,
      propertyType: item.property_type || item.propertyType,
      lotArea: item.lot_area || item.lotArea,
      developerId: item.developer_id || item.developerId,
    }))
  } catch (err) {
    console.error('Error fetching developer projects:', err)
    return []
  }
}
