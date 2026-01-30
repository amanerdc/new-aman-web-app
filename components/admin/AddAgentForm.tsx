'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

const agentSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  brokerage: z.string().min(1, 'Brokerage is required'),
  classification: z.enum(['Broker', 'Salesperson']),
  team: z.string().min(1, 'Team is required'),
})

type AgentFormData = z.infer<typeof agentSchema>

interface AddAgentFormProps {
  onSuccess?: () => void
  editingAgent?: AgentFormData | null
  onCancelEdit?: () => void
}

export function AddAgentForm({ onSuccess, editingAgent, onCancelEdit }: AddAgentFormProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: editingAgent || {},
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (editingAgent) {
      setValue('id', editingAgent.id)
      setValue('name', editingAgent.name)
      setValue('brokerage', editingAgent.brokerage)
      setValue('classification', editingAgent.classification)
      setValue('team', editingAgent.team)
    } else {
      reset()
    }
  }, [editingAgent, setValue, reset])

  const onSubmit = async (data: AgentFormData) => {
    setLoading(true)
    setMessage(null)

    const url = editingAgent ? `/api/agents/${editingAgent.id}` : '/api/agents'
    const method = editingAgent ? 'PUT' : 'POST'

    console.log('Form submit - URL:', url, 'Method:', method, 'Data:', data)

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      console.log('Response status:', response.status, 'OK:', response.ok)

      if (response.ok) {
        setMessage({ type: 'success', text: editingAgent ? 'Agent updated successfully' : 'Agent added successfully' })
        reset()
        onSuccess?.()
      } else {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API error:', error)
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
        <Label htmlFor="id" className="mb-1">ID</Label>
        <Input id="id" {...register('id')} disabled={!!editingAgent} />
        {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
      </div>
      <div>
        <Label htmlFor="name" className="mb-1">Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="brokerage" className="mb-1">Brokerage</Label>
        <Input id="brokerage" {...register('brokerage')} />
        {errors.brokerage && <p className="text-red-500 text-sm">{errors.brokerage.message}</p>}
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
        <Label htmlFor="team" className="mb-1">Team</Label>
        <Input id="team" {...register('team')} />
        {errors.team && <p className="text-red-500 text-sm">{errors.team.message}</p>}
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