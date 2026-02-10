'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'

const seriesSchema = z.object({
  id: z.string().min(1, 'ID is required').min(3, 'ID must be at least 3 characters'),
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  developer: z.enum(['Aman Engineering', 'Enjoy Realty & Development Corporation'], { message: 'Please select a valid developer' }),
  floor_area: z.string().nullable().optional(),
  base_price: z.number().min(0, 'Price must be a positive number').nullable().optional(),
  loft_ready: z.boolean().nullable().optional(),
  project: z.string().min(1, 'Project name is required').nullable().optional(),
  description: z.string().nullable().optional(),
  long_description: z.string().nullable().optional(),
  features: z.string().nullable().optional(),
  specifications: z.string().nullable().optional(),
  floor_plan_image: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
})

type SeriesFormData = z.infer<typeof seriesSchema>

interface AddSeriesFormProps {
  onSuccess?: () => void
  editingSeries?: SeriesFormData | null
  onCancelEdit?: () => void
}

export function AddSeriesForm({ onSuccess, editingSeries, onCancelEdit }: AddSeriesFormProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<SeriesFormData>({
    resolver: zodResolver(seriesSchema),
    defaultValues: editingSeries ? {
      ...editingSeries,
      features: typeof editingSeries.features === 'string' ? editingSeries.features : (editingSeries.features as any).join(', '),
      specifications: editingSeries.specifications ? (typeof editingSeries.specifications === 'string' ? editingSeries.specifications : JSON.stringify(editingSeries.specifications, null, 2)) : null
    } : {},
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (editingSeries) {
      setValue('id', editingSeries.id)
      setValue('name', editingSeries.name)
      setValue('developer', editingSeries.developer)
      setValue('floor_area', editingSeries.floor_area)
      setValue('loft_ready', editingSeries.loft_ready)
      setValue('description', editingSeries.description)
      setValue('long_description', editingSeries.long_description)
      setValue('features', editingSeries.features ? (typeof editingSeries.features === 'string' ? editingSeries.features : (editingSeries.features as any).join(', ')) : '')
      setValue('project', editingSeries.project)
      setValue('base_price', editingSeries.base_price)
      setValue('specifications', editingSeries.specifications ? (typeof editingSeries.specifications === 'string' ? editingSeries.specifications : JSON.stringify(editingSeries.specifications, null, 2)) : null)
      setValue('floor_plan_image', editingSeries.floor_plan_image)
      setValue('image_url', editingSeries.image_url)
    } else {
      reset()
    }
  }, [editingSeries, setValue, reset])

  const onSubmit = async (data: SeriesFormData) => {
    setLoading(true)
    setMessage(null)

    const url = editingSeries ? `/api/series/${editingSeries.id}` : '/api/series'
    const method = editingSeries ? 'PUT' : 'POST'

    let specifications: any = null
    if (data.specifications) {
      try {
        specifications = JSON.parse(data.specifications)
      } catch (e) {
        setMessage({ type: 'error', text: 'Invalid JSON in specifications field' })
        setLoading(false)
        return
      }
    }

    const payload = {
      ...data,
      features: data.features ? data.features.split(',').map(f => f.trim()) : [],
      specifications,
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
        setMessage({ type: 'success', text: editingSeries ? 'Series updated successfully' : 'Series added successfully' })
        reset()
        onSuccess?.()
      } else {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('API error:', error)
        setMessage({ type: 'error', text: error.error || (editingSeries ? 'Error updating series' : 'Error adding series') })
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
          <Input id="id" {...register('id')} disabled={!!editingSeries} />
          {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
        </div>
        <div className="col-span-2">
          <Label htmlFor="name" className="mb-1">Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="floor_area" className="mb-1">Floor Area</Label>
          <Input id="floor_area" {...register('floor_area')} />
          {errors.floor_area && <p className="text-red-500 text-sm">{errors.floor_area.message}</p>}
        </div>
        <div>
          <Label htmlFor="base_price" className="mb-1">Base Price</Label>
          <Input id="base_price" type="number" step="0.01" {...register('base_price', { valueAsNumber: true })} />
          {errors.base_price && <p className="text-red-500 text-sm">{errors.base_price.message}</p>}
        </div>
        <div>
          <Label htmlFor="loft_ready" className="mb-1">Loft Ready</Label>
          <input type="checkbox" id="loft_ready" {...register('loft_ready')} />
        </div>
        <div>
          <Label htmlFor="developer" className="mb-1">Developer</Label>
          <select id="developer" {...register('developer')} className="border rounded p-2 w-full">
            <option value="">Select Developer</option>
            <option value="Aman Engineering">Aman Engineering</option>
            <option value="Enjoy Realty & Development Corporation">Enjoy Realty & Development Corporation</option>
          </select>
          {errors.developer && <p className="text-red-500 text-sm">{errors.developer.message}</p>}
        </div>
        <div className="col-span-2">
          <Label htmlFor="project" className="mb-1">Project</Label>
          <Input id="project" {...register('project')} />
          {errors.project && <p className="text-red-500 text-sm">{errors.project.message}</p>}
        </div>
        <div className="col-span-2">
          <Label htmlFor="description" className="mb-1">Description</Label>
          <Textarea id="description" {...register('description')} className="text-sm" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="long_description" className="mb-1">Long Description</Label>
          <Textarea id="long_description" {...register('long_description')} className="text-sm" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="features" className="mb-1">Features (comma-separated)</Label>
          <Input id="features" {...register('features')} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="specifications" className="mb-1">Construction Specifications (JSON)</Label>
          <Textarea id="specifications" {...register('specifications')} className="text-sm" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="floor_plan_image" className="mb-1">Floor Plan Image</Label>
          <Input id="floor_plan_image" {...register('floor_plan_image')} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="image_url" className="mb-1">Media URL or Embed</Label>
          <Input
            id="image_url"
            placeholder="https://... or embed:https://..."
            {...register('image_url')}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Paste an image URL, Google Drive file link (share the file, not just the folder), or an embed link. For custom embeds, use
            <span className="font-medium"> embed:</span>
            followed by the iframe src.
          </p>
        </div>
      </div>
      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}
      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Saving...' : editingSeries ? 'Update Series' : 'Add Series'}
        </Button>
        {editingSeries && (
          <Button type="button" variant="outline" className="w-full" onClick={() => { reset(); onCancelEdit?.() }}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
