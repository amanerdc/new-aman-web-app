'use client'

import { useEffect, useState } from 'react'
import { AddUnitForm } from '@/components/admin/AddUnitForm'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { Pagination } from '@/components/admin/Pagination'
import { Button } from '@/components/ui/button'
import { Trash2, Edit } from 'lucide-react'

type Unit = {
  id: string
  name: string
  series_id: string
  description: string
  price: number
  location: string
  status: string
  is_rfo: boolean
  features: string[]
  series?: { name: string }
}

const ITEMS_PER_PAGE = 7

function UnitsPageContent() {
  const [units, setUnits] = useState<Unit[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null)

  useEffect(() => {
    fetchUnits()
  }, [])

  const fetchUnits = async () => {
    setLoading(true)
    const response = await fetch('/api/units')
    if (response.ok) {
      const data = await response.json()
      setUnits(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this unit?')) return
    try {
      const response = await fetch(`/api/units/${id}`, { method: 'DELETE' })
      const data = await response.json()
      if (response.ok) {
        fetchUnits()
      } else {
        console.error('Delete error:', data)
        alert(data.error || 'Error deleting unit')
      }
    } catch (err) {
      console.error('Delete fetch error:', err)
      alert('Error deleting unit')
    }
  }

  const handleUnitAdded = () => {
    setEditingUnit(null)
    fetchUnits()
    setCurrentPage(1)
  }

  const paginatedUnits = units.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  const totalPages = Math.ceil(units.length / ITEMS_PER_PAGE)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Units</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{editingUnit ? 'Edit Unit' : 'Add New Unit'}</h2>
          <AddUnitForm onSuccess={handleUnitAdded} editingUnit={editingUnit as any} onCancelEdit={() => setEditingUnit(null)} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Existing Units ({units.length})</h2>
          {loading ? (
            <p>Loading units...</p>
          ) : units.length === 0 ? (
            <p className="text-gray-600">No units found</p>
          ) : (
            <>
              <ul className="space-y-2">
                {paginatedUnits.map((u) => (
                  <li key={u.id} className="p-3 bg-gray-50 rounded border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">{u.series?.name} - {u.name}</p>
                        <p className="text-sm text-gray-600">Series: {u.series?.name || u.series_id}</p>
                        <p className="text-sm font-semibold">₱{u.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{u.status}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingUnit(u)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(u.id)}
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

export default function UnitsPage() {
  return (
    <ProtectedRoute>
      <UnitsPageContent />
    </ProtectedRoute>
  )
}