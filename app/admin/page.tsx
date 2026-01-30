'use client'

import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import Link from 'next/link'

function AdminDashboardContent() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/agents" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Manage Agents</h2>
          <p className="text-gray-600">Add, edit, and manage agents</p>
        </Link>
        <Link href="/admin/series" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Manage Series</h2>
          <p className="text-gray-600">Add, edit, and manage model house series</p>
        </Link>
        <Link href="/admin/units" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Manage Units</h2>
          <p className="text-gray-600">Add, edit, and manage units</p>
        </Link>
        <Link href="/admin/lot-only" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Manage Lot-Only</h2>
          <p className="text-gray-600">Add, edit, and manage lot-only properties</p>
        </Link>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}