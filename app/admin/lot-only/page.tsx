'use client'

import { useEffect, useState } from 'react'
import { AddLotOnlyForm } from '@/components/admin/AddLotOnlyForm'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { Pagination } from '@/components/admin/Pagination'
import { Button } from '@/components/ui/button'
import { Trash2, Edit } from 'lucide-react'

type LotOnly = {
  id: string
  name: string
  description: string
  price: number
  property_option: string
  location: string
  project: string
  developer: string
  status: string
  lot_area: string
  features: string[]
  reservation_fee: number
}

const ITEMS_PER_PAGE = 7

function LotOnlyPageContent() {
  const [lotOnly, setLotOnly] = useState<LotOnly[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingLotOnly, setEditingLotOnly] = useState<LotOnly | null>(null)

  useEffect(() => {
    fetchLotOnly()
  }, [])

  const fetchLotOnly = async () => {
    setLoading(true)
    const response = await fetch('/api/lot-only')
    if (response.ok) {
      const data = await response.json()
      setLotOnly(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lot-only property?')) return
    try {
      const response = await fetch(`/api/lot-only/${id}`, { method: 'DELETE' })
      const data = await response.json()
      if (response.ok) {
        fetchLotOnly()
      } else {
        console.error('Delete error:', data)
        alert(data.error || 'Error deleting lot-only property')
      }
    } catch (err) {
      console.error('Delete fetch error:', err)
      alert('Error deleting lot-only property')
    }
  }

  const handleLotOnlyAdded = () => {
    setEditingLotOnly(null)
    fetchLotOnly()
    setCurrentPage(1)
  }

  const paginatedLotOnly = lotOnly.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  const totalPages = Math.ceil(lotOnly.length / ITEMS_PER_PAGE)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Lot-Only</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{editingLotOnly ? 'Edit Lot-Only' : 'Add New Lot-Only'}</h2>
          <AddLotOnlyForm onSuccess={handleLotOnlyAdded} editingLotOnly={editingLotOnly as any} onCancelEdit={() => setEditingLotOnly(null)} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Existing Lot-Only ({lotOnly.length})</h2>
          {loading ? (
            <p>Loading lot-only properties...</p>
          ) : lotOnly.length === 0 ? (
            <p className="text-gray-600">No lot-only properties found</p>
          ) : (
            <>
              <ul className="space-y-2">
                {paginatedLotOnly.map((l) => (
                  <li key={l.id} className="p-3 bg-gray-50 rounded border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">{l.name}</p>
                        <p className="text-sm text-gray-600">{l.property_option}</p>
                        <p className="text-sm font-semibold">₱{l.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{l.status}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingLotOnly(l)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(l.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LotOnlyPage() {
  return (
    <ProtectedRoute>
      <LotOnlyPageContent />
    </ProtectedRoute>
  )
}