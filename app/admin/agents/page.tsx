'use client'

import { useEffect, useState } from 'react'
import { AddAgentForm } from '@/components/admin/AddAgentForm'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { Pagination } from '@/components/admin/Pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Edit, Eye } from 'lucide-react'

type Agent = {
  id: string
  name: string
  brokerage_id: string
  classification: string
  email: string
  contact_no: string
}

type Brokerage = {
  id: string
  name: string
  team: string
}

const ITEMS_PER_PAGE = 15

function AgentsPageContent() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [brokerages, setBrokerages] = useState<Brokerage[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [teamFilter, setTeamFilter] = useState<'all' | 'alpha' | 'mavericks' | 'titans'>('all')
  const [brokerageFilter, setBrokerageFilter] = useState<string>('all')
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [viewingAgent, setViewingAgent] = useState<Agent | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchAgents()
    fetchBrokerages()
  }, [])

  const fetchAgents = async () => {
    setLoading(true)
    const response = await fetch('/api/agents')
    if (response.ok) {
      const data = await response.json()
      setAgents(data)
    }
    setLoading(false)
  }

  const fetchBrokerages = async () => {
    const response = await fetch('/api/brokers')
    if (response.ok) {
      const data = await response.json()
      setBrokerages(data)
    }
  }

  const getBrokerageName = (brokerageId: string) => {
    return brokerages.find((b) => b.id === brokerageId)?.name || brokerageId
  }

  const getBrokerageTeam = (brokerageId: string) => {
    return brokerages.find((b) => b.id === brokerageId)?.team || ''
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return
    const response = await fetch(`/api/agents/${id}`, { method: 'DELETE' })
    if (response.ok) {
      fetchAgents()
    }
  }

  const handleAgentAdded = () => {
    setEditingAgent(null)
    setShowAddForm(false)
    fetchAgents()
    setCurrentPage(1)
  }

  const filteredAgents = agents.filter((agent) => {
    const brokerage = brokerages.find((b) => b.id === agent.brokerage_id)
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTeam = teamFilter === 'all' || brokerage?.team === teamFilter
    const matchesBrokerage = brokerageFilter === 'all' || agent.brokerage_id === brokerageFilter
    return matchesSearch && matchesTeam && matchesBrokerage
  })

  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Agents</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-primary hover:bg-primary/80">
          {showAddForm ? 'Cancel' : '+ Add New'}
        </Button>
      </div>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="mb-6 p-6 bg-white rounded-lg shadow border-l-4 border-primary">
          <h2 className="text-xl font-semibold mb-4">
            {editingAgent ? 'Edit Agent' : 'Add New Agent'}
          </h2>
          <AddAgentForm
            onSuccess={handleAgentAdded}
            editingAgent={editingAgent}
            onCancelEdit={() => setEditingAgent(null)}
          />
        </div>
      )}

      {/* View Modal */}
      {viewingAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Agent Details</h2>
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm text-gray-600">ID</p>
                <p className="font-semibold">{viewingAgent.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{viewingAgent.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Brokerage</p>
                <p className="font-semibold">{getBrokerageName(viewingAgent.brokerage_id)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Classification</p>
                <p className="font-semibold">{viewingAgent.classification}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{viewingAgent.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Number</p>
                <p className="font-semibold">{viewingAgent.contact_no || 'N/A'}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setViewingAgent(null)}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by Brokerage</label>
              <select
                value={brokerageFilter}
                onChange={(e) => {
                  setBrokerageFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="border rounded p-2 w-full"
              >
                <option value="all">All Brokerages</option>
                {brokerages.map((brokerage) => (
                  <option key={brokerage.id} value={brokerage.id}>
                    {brokerage.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Agents List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Agents ({filteredAgents.length})
        </h2>

        {loading ? (
          <p>Loading agents...</p>
        ) : filteredAgents.length === 0 ? (
          <p className="text-gray-600">No agents found</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">ID</th>
                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Brokerage</th>
                    <th className="px-4 py-2 text-left font-semibold">Classification</th>
                    <th className="px-4 py-2 text-left font-semibold">Email</th>
                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAgents.map((agent) => (
                    <tr key={agent.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">{agent.id}</td>
                      <td className="px-4 py-3">{agent.name}</td>
                      <td className="px-4 py-3">{getBrokerageName(agent.brokerage_id)}</td>
                      <td className="px-4 py-3">{agent.classification}</td>
                      <td className="px-4 py-3 text-xs">{agent.email || '—'}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewingAgent(agent)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingAgent(agent)
                            setShowAddForm(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(agent.id)}
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

export default function AgentsPage() {
  return (
    <ProtectedRoute>
      <AgentsPageContent />
    </ProtectedRoute>
  )
}
