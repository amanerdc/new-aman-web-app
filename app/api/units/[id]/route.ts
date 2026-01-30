import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params
    const id = resolvedParams.id
    const body = await request.json()
    console.log('PUT /api/units - ID:', id, 'Body:', body)
    
    const { data, error } = await supabase.from('units').update(body).eq('id', id).select()
    
    console.log('Supabase response:', { data, error })
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('PUT error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = params instanceof Promise ? await params : params
    const id = resolvedParams.id
    console.log('DELETE /api/units - ID:', id)
    
    const { error } = await supabase.from('units').delete().eq('id', id)
    
    console.log('Supabase delete response:', { error })
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}