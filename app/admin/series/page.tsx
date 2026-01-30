'use client'

import { useEffect, useState } from 'react'
import { AddSeriesForm } from '@/components/admin/AddSeriesForm'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { Pagination } from '@/components/admin/Pagination'
import { Button } from '@/components/ui/button'
import { Trash2, Edit } from 'lucide-react'

type Series = {
  id: string
  name: string
  floor_area: string
  loft_ready: boolean
  description: string
  long_description: string
  features: string[]
  base_price: number
  developer: string
  project: string
}

const ITEMS_PER_PAGE = 7

function SeriesPageContent() {
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingSeries, setEditingSeries] = useState<Series | null>(null)

  useEffect(() => {
    fetchSeries()
  }, [])

  const fetchSeries = async () => {
    setLoading(true)
    const response = await fetch('/api/series')
    if (response.ok) {
      const data = await response.json()
      setSeries(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this series?')) return
    try {
      const response = await fetch(`/api/series/${id}`, { method: 'DELETE' })
      const data = await response.json()
      if (response.ok) {
        fetchSeries()
      } else {
        console.error('Delete error:', data)
        alert(data.error || 'Error deleting series')
      }
    } catch (err) {
      console.error('Delete fetch error:', err)
      alert('Error deleting series')
    }
  }

  const handleSeriesAdded = () => {
    setEditingSeries(null)
    fetchSeries()
    setCurrentPage(1)
  }

  const paginatedSeries = series.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  const totalPages = Math.ceil(series.length / ITEMS_PER_PAGE)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Series</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{editingSeries ? 'Edit Series' : 'Add New Series'}</h2>
          <AddSeriesForm onSuccess={handleSeriesAdded} editingSeries={editingSeries as any} onCancelEdit={() => setEditingSeries(null)} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Existing Series ({series.length})</h2> 
          {loading ? (
            <p>Loading series...</p>
          ) : series.length === 0 ? (
            <p className="text-gray-600">No series found</p>
          ) : (
            <>
              <ul className="space-y-2">
                {paginatedSeries.map((s) => (
                  <li key={s.id} className="p-3 bg-gray-50 rounded border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-sm text-gray-600">ID: {s.id}</p>
                        <p className="text-sm text-gray-600">{s.floor_area}</p>
                        <p className="text-sm font-semibold">₱{s.base_price.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingSeries(s)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(s.id)}
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

export default function SeriesPage() {
  return (
    <ProtectedRoute>
      <SeriesPageContent />
    </ProtectedRoute>
  )
}