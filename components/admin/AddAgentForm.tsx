'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

const agentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  brokerage_id: z.string().min(1, 'Brokerage is required'),
  classification: z.enum(['Broker', 'Salesperson']),
  email: z.string().email('Valid email is required').or(z.literal('')),
  contact_no: z.string().optional().default(''),
})

type AgentFormData = z.infer<typeof agentSchema>

type Brokerage = {
  id: string
  name: string
  team: string
}

interface AddAgentFormProps {
  onSuccess?: () => void
  editingAgent?: {
    id: string
    name: string
    brokerage_id: string
    classification: 'Broker' | 'Salesperson'
    email: string
    contact_no: string
  } | null
  onCancelEdit?: () => void
}

export function AddAgentForm({ onSuccess, editingAgent, onCancelEdit }: AddAgentFormProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: editingAgent || {},
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [brokerages, setBrokerages] = useState<Brokerage[]>([])
  const [nextAgentId, setNextAgentId] = useState<string>('')
  
  const brokerageId = watch('brokerage_id')

  useEffect(() => {
    fetchBrokerages()
  }, [])

  useEffect(() => {
    if (brokerageId && !editingAgent) {
      generateNextAgentId(brokerageId)
    }
  }, [brokerageId, editingAgent])

  useEffect(() => {
    if (editingAgent) {
      setValue('id', editingAgent.id || '')
      setValue('name', editingAgent.name)
      setValue('brokerage_id', editingAgent.brokerage_id)
      setValue('classification', editingAgent.classification)
      setValue('email', editingAgent.email || '')
      setValue('contact_no', editingAgent.contact_no || '')
    } else {
      reset()
      setNextAgentId('')
    }
  }, [editingAgent, setValue, reset])

  const fetchBrokerages = async () => {
    const response = await fetch('/api/brokers')
    if (response.ok) {
      const data = await response.json()
      setBrokerages(data.sort((a: any, b: any) => a.team.localeCompare(b.team)))
    }
  }

  const generateNextAgentId = async (brokerage_id: string) => {
    try {
      const response = await fetch(`/api/agents/next-id?brokerage_id=${brokerage_id}`)
      if (response.ok) {
        const data = await response.json()
        setNextAgentId(data.id)
        setValue('id', data.id)
      }
    } catch (err) {
      console.error('Error generating agent ID:', err)
    }
  }

  const onSubmit = async (data: AgentFormData) => {
    setLoading(true)
    setMessage(null)

    const url = editingAgent ? `/api/agents/${editingAgent.id}` : '/api/agents'
    const method = editingAgent ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: editingAgent ? 'Agent updated successfully' : 'Agent added successfully' })
        reset()
        onSuccess?.()
      } else {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }))
        setMessage({ type: 'error', text: error.error || (editingAgent ? 'Error updating agent' : 'Error adding agent') })
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="id" className="mb-1">Agent ID (Auto-generated)</Label>
        <Input id="id" {...register('id')} disabled value={nextAgentId || ''} className="bg-gray-100" />
        {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
      </div>
      <div>
        <Label htmlFor="name" className="mb-1">Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="brokerage_id" className="mb-1">Brokerage</Label>
        <select id="brokerage_id" {...register('brokerage_id')} className="border rounded p-2 w-full">
          <option value="">Select Brokerage</option>
          {brokerages.map((brokerage) => (
            <option key={brokerage.id} value={brokerage.id}>
              {brokerage.name} ({brokerage.id})
            </option>
          ))}
        </select>
        {errors.brokerage_id && <p className="text-red-500 text-sm">{errors.brokerage_id.message}</p>}
      </div>
      <div>
        <Label htmlFor="classification" className="mb-1">Classification</Label>
        <select id="classification" {...register('classification')} className="border rounded p-2 w-full">
          <option value="">Select Classification</option>
          <option value="Broker">Broker</option>
          <option value="Salesperson">Salesperson</option>
        </select>
        {errors.classification && <p className="text-red-500 text-sm">{errors.classification.message}</p>}
      </div>
      <div>
        <Label htmlFor="email" className="mb-1">Email</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="contact_no" className="mb-1">Contact Number</Label>
        <Input id="contact_no" {...register('contact_no')} />
        {errors.contact_no && <p className="text-red-500 text-sm">{errors.contact_no.message}</p>}
      </div>
      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Saving...' : editingAgent ? 'Update Agent' : 'Add Agent'}
        </Button>
        {editingAgent && (
          <Button type="button" variant="outline" className="w-full" onClick={() => { reset(); onCancelEdit?.() }}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}