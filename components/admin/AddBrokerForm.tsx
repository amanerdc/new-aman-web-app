'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

const brokerageSchema = z.object({
  id: z.string().min(1, 'ID is required').regex(/^[a-z]\d{2}$/, 'ID must be in format: a10, m20, t30, etc.'),
  name: z.string().min(1, 'Name is required'),
  head_broker: z.string().optional().default(''),
  contact_no: z.string().optional().default(''),
  team: z.enum(['alpha', 'mavericks', 'titans'], { errorMap: () => ({ message: 'Team is required' }) }),
})

type BrokerageFormData = z.infer<typeof brokerageSchema>

interface AddBrokerFormProps {
  onSuccess?: () => void
  editingBrokerage?: BrokerageFormData | null
  onCancelEdit?: () => void
}

export function AddBrokerForm({ onSuccess, editingBrokerage, onCancelEdit }: AddBrokerFormProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<BrokerageFormData>({
    resolver: zodResolver(brokerageSchema),
    defaultValues: editingBrokerage || {},
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (editingBrokerage) {
      setValue('id', editingBrokerage.id)
      setValue('name', editingBrokerage.name)
      setValue('head_broker', editingBrokerage.head_broker || '')
      setValue('contact_no', editingBrokerage.contact_no || '')
      setValue('team', editingBrokerage.team)
    } else {
      reset()
    }
  }, [editingBrokerage, setValue, reset])

  const onSubmit = async (data: BrokerageFormData) => {
    setLoading(true)
    setMessage(null)

    const url = editingBrokerage ? `/api/brokers/${editingBrokerage.id}` : '/api/brokers'
    const method = editingBrokerage ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: editingBrokerage ? 'Brokerage updated successfully' : 'Brokerage added successfully' })
        reset()
        onSuccess?.()
      } else {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }))
        setMessage({ type: 'error', text: error.error || (editingBrokerage ? 'Error updating brokerage' : 'Error adding brokerage') })
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
        <Label htmlFor="id" className="mb-1">ID (format: a10, m20, t30, etc.)</Label>
        <Input id="id" placeholder="e.g., a10" {...register('id')} disabled={!!editingBrokerage} />
        {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
      </div>
      <div>
        <Label htmlFor="name" className="mb-1">Brokerage Name</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="head_broker" className="mb-1">Head Broker</Label>
        <Input id="head_broker" {...register('head_broker')} />
        {errors.head_broker && <p className="text-red-500 text-sm">{errors.head_broker.message}</p>}
      </div>
      <div>
        <Label htmlFor="contact_no" className="mb-1">Contact Number</Label>
        <Input id="contact_no" {...register('contact_no')} />
        {errors.contact_no && <p className="text-red-500 text-sm">{errors.contact_no.message}</p>}
      </div>
      <div>
        <Label htmlFor="team" className="mb-1">Team</Label>
        <select id="team" {...register('team')} className="border rounded p-2 w-full">
          <option value="">Select Team</option>
          <option value="alpha">Alpha</option>
          <option value="mavericks">Mavericks</option>
          <option value="titans">Titans</option>
        </select>
        {errors.team && <p className="text-red-500 text-sm">{errors.team.message}</p>}
      </div>
      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Saving...' : editingBrokerage ? 'Update Brokerage' : 'Add Brokerage'}
        </Button>
        {editingBrokerage && (
          <Button type="button" variant="outline" className="w-full" onClick={() => { reset(); onCancelEdit?.() }}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
