'use client'

import { useEffect, useState, useRef } from 'react'
import { AddBrokerForm } from '@/components/admin/AddBrokerForm'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { Pagination } from '@/components/admin/Pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Edit, Eye } from 'lucide-react'

type Brokerage = {
  id: string
  name: string
  head_broker: string
  contact_no: string
  team: 'alpha' | 'mavericks' | 'titans'
}

const ITEMS_PER_PAGE = 15
const STORAGE_KEY = 'admin_brokers_filters'

function BrokersPageContent() {
  const [brokerages, setBrokerages] = useState<Brokerage[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [teamFilter, setTeamFilter] = useState<'all' | 'alpha' | 'mavericks' | 'titans'>('all')
  const [editingBrokerage, setEditingBrokerage] = useState<Brokerage | null>(null)
  const [viewingBrokerage, setViewingBrokerage] = useState<Brokerage | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  // Load cached filters from localStorage
  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY)
    if (cached) {
      try {
        const { searchTerm: cachedSearch, teamFilter: cachedTeam } = JSON.parse(cached)
        setSearchTerm(cachedSearch || '')
        setTeamFilter(cachedTeam || 'all')
      } catch (err) {
        console.error('Error loading cached filters:', err)
      }
    }
  }, [])

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ searchTerm, teamFilter }))
  }, [searchTerm, teamFilter])

  useEffect(() => {
    fetchBrokerages()
  }, [])

  const fetchBrokerages = async () => {
    setLoading(true)
    const response = await fetch('/api/brokers')
    if (response.ok) {
      const data = await response.json()
      setBrokerages(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brokerage?')) return
    const response = await fetch(`/api/brokers/${id}`, { method: 'DELETE' })
    if (response.ok) {
      fetchBrokerages()
    }
  }

  const handleBrokerageAdded = () => {
    setEditingBrokerage(null)
    setShowAddForm(false)
    fetchBrokerages()
    setCurrentPage(1)
  }

  const handleEditClick = (brokerage: Brokerage) => {
    setEditingBrokerage(brokerage)
    setShowAddForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  const filteredBrokerages = brokerages.filter((brokerage) => {
    const matchesSearch = brokerage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brokerage.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTeam = teamFilter === 'all' || brokerage.team === teamFilter
    return matchesSearch && matchesTeam
  })

  const paginatedBrokerages = filteredBrokerages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const totalPages = Math.ceil(filteredBrokerages.length / ITEMS_PER_PAGE)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Brokers</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary hover:bg-primary/80">
          {showAddForm ? 'Cancel' : '+ Add New'}
        </Button>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div ref={formRef} className="mb-6 p-6 bg-white rounded-lg shadow border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4">
            {editingBrokerage ? 'Edit Brokerage' : 'Add New Brokerage'}
          </h2>
          <AddBrokerForm
            onSuccess={handleBrokerageAdded}
            editingBrokerage={editingBrokerage}
            onCancelEdit={() => setEditingBrokerage(null)}
          />
        </div>
      )}

      {/* View Modal */}
      {viewingBrokerage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Brokerage Details</h2>
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm text-gray-600">ID</p>
                <p className="font-semibold">{viewingBrokerage.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{viewingBrokerage.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Head Broker</p>
                <p className="font-semibold">{viewingBrokerage.head_broker || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Number</p>
                <p className="font-semibold">{viewingBrokerage.contact_no || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Team</p>
                <p className="font-semibold capitalize">{viewingBrokerage.team}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setViewingBrokerage(null)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <Input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by Team</label>
            <select
              value={teamFilter}
              onChange={(e) => {
                setTeamFilter(e.target.value as any)
                setCurrentPage(1)
              }}
              className="border rounded p-2 w-full"
            >
              <option value="all">All Teams</option>
              <option value="alpha">Alpha</option>
              <option value="mavericks">Mavericks</option>
              <option value="titans">Titans</option>
            </select>
          </div>
        </div>
      </div>

      {/* Brokerages List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Brokerages ({filteredBrokerages.length})
        </h2>

        {loading ? (
          <p>Loading brokerages...</p>
        ) : filteredBrokerages.length === 0 ? (
          <p className="text-gray-600">No brokerages found</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">ID</th>
                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Head Broker</th>
                    <th className="px-4 py-2 text-left font-semibold">Team</th>
                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBrokerages.map((brokerage) => (
                    <tr key={brokerage.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">{brokerage.id}</td>
                      <td className="px-4 py-3">{brokerage.name}</td>
                      <td className="px-4 py-3">{brokerage.head_broker || '—'}</td>
                      <td className="px-4 py-3 capitalize">{brokerage.team}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewingBrokerage(brokerage)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditClick(brokerage)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(brokerage.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function BrokersPage() {
  return (
    <ProtectedRoute>
      <BrokersPageContent />
    </ProtectedRoute>
  )
}
