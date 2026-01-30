'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'

const unitSchema = z.object({
  id: z.string().min(1, 'ID is required').min(3, 'ID must be at least 3 characters'),
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  series_id: z.string().min(1, 'Series ID is required'),
  floor_area: z.string().min(1, 'Floor Area is required'),
  description: z.string().nullable().optional(),
  price: z.number().min(0, 'Price must be a positive number').nullable().optional(),
  lot_only_price: z.number().min(0, 'Lot only price must be positive').nullable().optional(),
  house_construction_price: z.number().min(0, 'House construction price must be positive').nullable().optional(),
  location: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  is_rfo: z.boolean().nullable().optional(),
  features: z.string().nullable().optional(),
  floor_plan_image: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  floor_plan_pdf_id: z.string().nullable().optional(),
  walkthrough: z.string().url('Walkthrough must be a valid URL').nullable().optional().or(z.literal('')),
  reservation_fee: z.number().min(0, 'Reservation fee must be positive').nullable().optional(),
  financing_options: z.string().nullable().optional(),
  down_payment_percentage: z.number().min(0, 'Percentage must be at least 0').max(100, 'Percentage cannot exceed 100').nullable().optional(),
  completion_date: z.string().nullable().optional(),
  construction_progress: z.number().min(0, 'Progress must be at least 0').max(100, 'Progress cannot exceed 100').nullable().optional(),
})

type UnitFormData = z.infer<typeof unitSchema>

interface AddUnitFormProps {
  onSuccess?: () => void
  editingUnit?: UnitFormData | null
  onCancelEdit?: () => void
}

export function AddUnitForm({ onSuccess, editingUnit, onCancelEdit }: AddUnitFormProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<UnitFormData>({
    resolver: zodResolver(unitSchema),
    defaultValues: editingUnit ? {
      ...editingUnit,
      features: typeof editingUnit.features === 'string' ? editingUnit.features : (editingUnit.features as any).join(', ')
    } : {},
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (editingUnit) {
      setValue('id', editingUnit.id)
      setValue('series_id', editingUnit.series_id)
      setValue('name', editingUnit.name)
      setValue('floor_area', editingUnit.floor_area)
      setValue('price', editingUnit.price)
      setValue('lot_only_price', editingUnit.lot_only_price)
      setValue('house_construction_price', editingUnit.house_construction_price)
      setValue('description', editingUnit.description)
      setValue('location', editingUnit.location)
      setValue('status', editingUnit.status)
      setValue('is_rfo', editingUnit.is_rfo)
      setValue('floor_plan_image', editingUnit.floor_plan_image)
      setValue('image_url', editingUnit.image_url)
      setValue('floor_plan_pdf_id', editingUnit.floor_plan_pdf_id)
      setValue('walkthrough', editingUnit.walkthrough)
      setValue('reservation_fee', editingUnit.reservation_fee)
      setValue('financing_options', editingUnit.financing_options)
      setValue('down_payment_percentage', editingUnit.down_payment_percentage)
      setValue('completion_date', editingUnit.completion_date)
      setValue('construction_progress', editingUnit.construction_progress)
      setValue('features', editingUnit.features ? (typeof editingUnit.features === 'string' ? editingUnit.features : (editingUnit.features as any).join(', ')) : '')
    } else {
      reset()
    }
  }, [editingUnit, setValue, reset])

  const onSubmit = async (data: UnitFormData) => {
    setLoading(true)
    setMessage(null)

    const url = editingUnit ? `/api/units/${editingUnit.id}` : '/api/units'
    const method = editingUnit ? 'PUT' : 'POST'

    const payload = {
      ...data,
      features: data.features ? data.features.split(',').map(f => f.trim()) : [],
    }

    console.log('Form submit - URL:', url, 'Method:', method, 'Payload:', payload)

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      console.log('Response status:', response.status, 'OK:', response.ok)

      if (response.ok) {
        setMessage({ type: 'success', text: editingUnit ? 'Unit updated successfully' : 'Unit added successfully' })
        reset()
        onSuccess?.()
      } else {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API error:', error)
        setMessage({ type: 'error', text: error.error || (editingUnit ? 'Error updating unit' : 'Error adding unit') })
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
        <div className="col-span-2">
          <Label htmlFor="id" className="mb-1">ID</Label>
          <Input id="id" className="mb-1"{...register('id')} disabled={!!editingUnit} />
          {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
        </div>
        <div>
          <Label htmlFor="name" className="mb-1">Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="series_id" className="mb-1">Series ID</Label>
          <Input id="series_id" {...register('series_id')} />
          {errors.series_id && <p className="text-red-500 text-sm">{errors.series_id.message}</p>}
        </div>
        <div className="col-span-2">
          <Label htmlFor="description" className="mb-1">Description</Label>
          <Textarea id="description" {...register('description')} className="text-sm" />
        </div>
        <div>
          <Label htmlFor="price" className="mb-1">Price</Label>
          <Input id="price" type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>
        <div>
          <Label htmlFor="lot_only_price" className="mb-1">Lot Only Price</Label>
          <Input id="lot_only_price" type="number" step="0.01" {...register('lot_only_price', { valueAsNumber: true })} />
          {errors.lot_only_price && <p className="text-red-500 text-sm">{errors.lot_only_price.message}</p>}
        </div>
        <div>
          <Label htmlFor="house_construction_price" className="mb-1">House Construction Price</Label>
          <Input id="house_construction_price" type="number" step="0.01" {...register('house_construction_price', { valueAsNumber: true })} />
          {errors.house_construction_price && <p className="text-red-500 text-sm">{errors.house_construction_price.message}</p>}
        </div>
        <div>
          <Label htmlFor="reservation_fee" className="mb-1">Reservation Fee</Label>
          <Input id="reservation_fee" type="number" step="0.01" {...register('reservation_fee', { valueAsNumber: true })} />
          {errors.reservation_fee && <p className="text-red-500 text-sm">{errors.reservation_fee.message}</p>}
        </div>
        <div>
          <Label htmlFor="location" className="mb-1">Location</Label>
          <Input id="location" {...register('location')} />
        </div>
        <div>
          <Label htmlFor="status" className="mb-1">Status</Label>
          <Input id="status" {...register('status')} />
        </div>
        <div>
          <Label htmlFor="floor_area" className="mb-1">Floor Area</Label>
          <Input id="floor_area" {...register('floor_area')} />
          {errors.floor_area && <p className="text-red-500 text-sm">{errors.floor_area.message}</p>}
        </div>
        <div>
          <Label htmlFor="completion_date" className="mb-1">Completion Date</Label>
          <Input id="completion_date" type="date" {...register('completion_date')} />
        </div>
        <div>
          <Label htmlFor="construction_progress" className="mb-1">Construction Progress (%)</Label>
          <Input id="construction_progress" type="number" min="0" max="100" {...register('construction_progress', { valueAsNumber: true })} />
          {errors.construction_progress && <p className="text-red-500 text-sm">{errors.construction_progress.message}</p>}
        </div>
        <div>
          <Label htmlFor="down_payment_percentage" className="mb-1">Down Payment Percentage (%)</Label>
          <Input id="down_payment_percentage" type="number" min="0" max="100" {...register('down_payment_percentage', { valueAsNumber: true })} />
          {errors.down_payment_percentage && <p className="text-red-500 text-sm">{errors.down_payment_percentage.message}</p>}
        </div>
        <div className="col-span-2">
          <Label htmlFor="features" className="mb-1">Features (comma-separated)</Label>
          <Input id="features" {...register('features')} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="financing_options" className="mb-1">Financing Options</Label>
          <Input id="financing_options" {...register('financing_options')} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="floor_plan_image" className="mb-1">Floor Plan Image</Label>
          <Input id="floor_plan_image" {...register('floor_plan_image')} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="image_url" className="mb-1">Image URL</Label>
          <Input id="image_url" {...register('image_url')} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="floor_plan_pdf_id" className="mb-1">Floor Plan PDF ID</Label>
          <Input id="floor_plan_pdf_id" {...register('floor_plan_pdf_id')} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="walkthrough" className="mb-1">Walkthrough URL</Label>
          <Input id="walkthrough" {...register('walkthrough')} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="is_rfo" className="mb-1">Is RFO</Label>
          <input type="checkbox" id="is_rfo" {...register('is_rfo')} />
        </div>
      </div>
      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Saving...' : editingUnit ? 'Update Unit' : 'Add Unit'}
        </Button>
        {editingUnit && (
          <Button type="button" variant="outline" className="w-full" onClick={() => { reset(); onCancelEdit?.() }}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}