'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'

const lotOnlySchema = z.object({
  id: z.string().min(1, 'ID is required').min(3, 'ID must be at least 3 characters'),
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  lot_area: z.string().min(1, 'Lot Area is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be a positive number').nullable().optional(),
  property_option: z.enum(['nur_lot_only', 'palm_lot_only', 'pvv_p2_lot_only',  'pvv_p3_lot_only', 'pv_ev_lot_only'], { message: 'Please select a valid property option' }).optional(),
  location: z.string().min(1, 'Location is required').nullable().optional(),
  project: z.string().min(1, 'Project name is required').nullable().optional(),
  developer: z.enum(['Aman Engineering', 'Enjoy Realty & Development Corporation'], { message: 'Please select a valid developer' }).nullable().optional(),
  status: z.string().nullable().optional(),
  features: z.string().optional(),
  reservation_fee: z.number().min(0, 'Reservation fee must be positive').nullable().optional(),
  image_url: z.string().nullable().optional(),
  property_type: z.string().nullable().optional(),
  financing_options: z.string().nullable().optional(),
  down_payment_percentage: z.number().min(0, 'Percentage must be at least 0').max(100, 'Percentage cannot exceed 100').nullable().optional(),
  down_payment_terms: z.string().nullable().optional(),
  zoning: z.string().nullable().optional(),
  utilities: z.string().nullable().optional(),
  nearby_amenities: z.string().nullable().optional(),
})

type LotOnlyFormData = z.infer<typeof lotOnlySchema>

interface AddLotOnlyFormProps {
  onSuccess?: () => void
  editingLotOnly?: LotOnlyFormData | null
  onCancelEdit?: () => void
}

export function AddLotOnlyForm({ onSuccess, editingLotOnly, onCancelEdit }: AddLotOnlyFormProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<LotOnlyFormData>({
    resolver: zodResolver(lotOnlySchema),
    defaultValues: editingLotOnly ? {
      ...editingLotOnly,
      features: typeof editingLotOnly.features === 'string' ? editingLotOnly.features : (editingLotOnly.features as any).join(', ')
    } : {},
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (editingLotOnly) {
      setValue('id', editingLotOnly.id)
      setValue('name', editingLotOnly.name)
      setValue('description', editingLotOnly.description)
      setValue('price', editingLotOnly.price)
      setValue('property_option', editingLotOnly.property_option as any)
      setValue('location', editingLotOnly.location)
      setValue('project', editingLotOnly.project)
      setValue('developer', editingLotOnly.developer as any)
      setValue('status', editingLotOnly.status)
      setValue('lot_area', editingLotOnly.lot_area)
      setValue('features', editingLotOnly.features ? (typeof editingLotOnly.features === 'string' ? editingLotOnly.features : (editingLotOnly.features as any).join(', ')) : '')
      setValue('reservation_fee', editingLotOnly.reservation_fee)
      setValue('image_url', editingLotOnly.image_url)
      setValue('property_type', editingLotOnly.property_type)
      setValue('financing_options', editingLotOnly.financing_options)
      setValue('down_payment_percentage', editingLotOnly.down_payment_percentage)
      setValue('down_payment_terms', editingLotOnly.down_payment_terms)
      setValue('zoning', editingLotOnly.zoning)
      setValue('utilities', editingLotOnly.utilities ? (typeof editingLotOnly.utilities === 'string' ? editingLotOnly.utilities : (editingLotOnly.utilities as any).join(', ')) : '')
      setValue('nearby_amenities', editingLotOnly.nearby_amenities ? (typeof editingLotOnly.nearby_amenities === 'string' ? editingLotOnly.nearby_amenities : (editingLotOnly.nearby_amenities as any).join(', ')) : '')
    } else {
      reset()
    }
  }, [editingLotOnly, setValue, reset])

  const onSubmit = async (data: LotOnlyFormData) => {
    setLoading(true)
    setMessage(null)

    const url = editingLotOnly ? `/api/lot-only/${editingLotOnly.id}` : '/api/lot-only'
    const method = editingLotOnly ? 'PUT' : 'POST'

    const normalize = <T,>(v: T | '' | undefined) =>
      v === '' || v === undefined ? null : v
    const normalizeNumber = (v: number | null | undefined) =>
      v === undefined || v === null || Number.isNaN(v) ? null : v

    const payload = {
      ...data,
      property_option: normalize(data.property_option),
      developer: normalize(data.developer),
      location: normalize(data.location),
      project: normalize(data.project),
      status: normalize(data.status),
      property_type: normalize(data.property_type),
      financing_options: normalize(data.financing_options),
      down_payment_terms: normalize(data.down_payment_terms),
      zoning: normalize(data.zoning),
      image_url: normalize(data.image_url),
      price: normalizeNumber(data.price),
      reservation_fee: normalizeNumber(data.reservation_fee),
      down_payment_percentage: normalizeNumber(data.down_payment_percentage),

      features: data.features
        ? data.features.split(',').map(f => f.trim())
        : [],

      utilities: data.utilities
        ? data.utilities.split(',').map(f => f.trim())
        : [],

      nearby_amenities: data.nearby_amenities
        ? data.nearby_amenities.split(',').map(f => f.trim())
        : [],
    }

    console.log('Submitting payload:', payload)

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const responseText = await response.text()
      const result = responseText
        ? (() => {
            try {
              return JSON.parse(responseText)
            } catch {
              return null
            }
          })()
        : null

      if (!response.ok) {
        console.error('API error:', result)
        setMessage({
          type: 'error',
          text:
            result?.error ||
            result?.message ||
            responseText ||
            'Failed to save lot-only',
        })
        return
      }

      setMessage({
        type: 'success',
        text: editingLotOnly
          ? 'Lot-Only updated successfully'
          : 'Lot-Only added successfully',
      })

      reset()
      onSuccess?.()
    } catch (err) {
      console.error('Network error:', err)
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
        <div className="col-span-2">
          <Label htmlFor="id" className="mb-1">ID</Label>
          <Input id="id" {...register('id')} disabled={!!editingLotOnly} />
          {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
        </div>
        <div className="col-span-2">
          <Label htmlFor="name" className="mb-1">Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
          <Label htmlFor="reservation_fee" className="mb-1">Reservation Fee</Label>
          <Input id="reservation_fee" type="number" step="0.01" {...register('reservation_fee', { valueAsNumber: true })} />
          {errors.reservation_fee && <p className="text-red-500 text-sm">{errors.reservation_fee.message}</p>}
        </div>
        <div>
          <Label htmlFor="property_option" className="mb-1">Property Option</Label>
          <select id="property_option" {...register('property_option')} className="border rounded p-2 w-full">
            <option value="">Select Property Option</option>
            <option value="nur_lot_only">NUR Lot Only</option>
            <option value="palm_lot_only">Palm Lot Only</option>
            <option value="pvv_p2_lot_only">Parkview Village Phase 2 Lot Only</option>
            <option value="pvv_p3_lot_only">Parkview Village Phase 3 Lot Only</option>
            <option value="pv_ev_lot_only">Parkview Employees' Village Lot Only</option>
          </select>
          {errors.property_option && <p className="text-red-500 text-sm">{errors.property_option.message}</p>}
        </div>
        <div>
          <Label htmlFor="property_type" className="mb-1">Property Type</Label>
          <Input id="property_type" {...register('property_type')} />
        </div>
        <div>
          <Label htmlFor="location" className="mb-1">Location</Label>
          <Input id="location" {...register('location')} />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div>
          <Label htmlFor="lot_area" className="mb-1">Lot Area</Label>
          <Input id="lot_area" {...register('lot_area')} />
          {errors.lot_area && <p className="text-red-500 text-sm">{errors.lot_area.message}</p>}
        </div>
        <div>
          <Label htmlFor="zoning" className="mb-1">Zoning</Label>
          <Input id="zoning" {...register('zoning')} />
        </div>
        <div>
          <Label htmlFor="project" className="mb-1">Project</Label>
          <Input id="project" {...register('project')} />
          {errors.project && <p className="text-red-500 text-sm">{errors.project.message}</p>}
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
        <div>
          <Label htmlFor="status" className="mb-1">Status</Label>
          <Input id="status" {...register('status')} />
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
          <Label htmlFor="down_payment_terms" className="mb-1">Down Payment Terms</Label>
          <Input id="down_payment_terms" {...register('down_payment_terms')} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="utilities" className="mb-1">Utilities (comma-separated)</Label>
          <Input id="utilities" {...register('utilities')} />
        </div>
        <div className="col-span-2">
          <Label htmlFor="nearby_amenities" className="mb-1">Nearby Amenities (comma-separated)</Label>
          <Input id="nearby_amenities" {...register('nearby_amenities')} />
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
          {loading ? 'Saving...' : editingLotOnly ? 'Update Lot-Only' : 'Add Lot-Only'}
        </Button>
        {editingLotOnly && (
          <Button type="button" variant="outline" className="w-full" onClick={() => { reset(); onCancelEdit?.() }}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
