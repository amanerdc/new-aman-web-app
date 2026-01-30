'use client'

import { useEffect, useState } from 'react'
import { AddAgentForm } from '@/components/admin/AddAgentForm'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { Pagination } from '@/components/admin/Pagination'
import { Button } from '@/components/ui/button'
import { Trash2, Edit } from 'lucide-react'

type Agent = {
  id: string
  name: string
  brokerage: string
  classification: string
  team: string
}

const ITEMS_PER_PAGE = 7

function AgentsPageContent() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)

  useEffect(() => {
    fetchAgents()
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return
    const response = await fetch(`/api/agents/${id}`, { method: 'DELETE' })
    if (response.ok) {
      fetchAgents()
    }
  }

  const handleAgentAdded = () => {
    setEditingAgent(null)
    fetchAgents()
    setCurrentPage(1)
  }

  const paginatedAgents = agents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const totalPages = Math.ceil(agents.length / ITEMS_PER_PAGE)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Agents</h1>

      {/* items-start prevents equal-height columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editingAgent ? 'Edit Agent' : 'Add New Agent'}
          </h2>

          <AddAgentForm
            onSuccess={handleAgentAdded}
            editingAgent={editingAgent as any}
            onCancelEdit={() => setEditingAgent(null)}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Existing Agents ({agents.length})
          </h2>

          {loading ? (
            <p>Loading agents...</p>
          ) : agents.length === 0 ? (
            <p className="text-gray-600">No agents found</p>
          ) : (
            <>
              <ul className="space-y-2">
                {paginatedAgents.map((agent) => (
                  <li
                    key={agent.id}
                    className="p-3 bg-gray-50 rounded border"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{agent.name}</p>
                        <p className="text-sm text-gray-600">ID: {agent.id}</p>
                        <p className="text-sm text-gray-600">{agent.brokerage}</p>
                        <p className="text-sm text-gray-600">
                          {agent.classification} – {agent.team}
                        </p>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingAgent(agent)}
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
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
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
