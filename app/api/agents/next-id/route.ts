import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const brokerage_id = request.nextUrl.searchParams.get('brokerage_id')
    
    if (!brokerage_id) {
      return NextResponse.json({ error: 'brokerage_id is required' }, { status: 400 })
    }

    // Get all agents for this brokerage and extract the number after the dash
    const { data, error } = await supabase
      .from('agents')
      .select('id')
      .eq('brokerage_id', brokerage_id)
      .order('id', { ascending: false })
      .limit(1)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    let nextNumber = 1
    if (data && data.length > 0) {
      const lastId = data[0].id
      const match = lastId.match(/-(\d+)$/)
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1
      }
    }

    const nextId = `${brokerage_id}-${nextNumber}`
    return NextResponse.json({ id: nextId })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
