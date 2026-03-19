'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
      setLoading(false)
    }
    checkAuth()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })
    return () => subscription?.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!isLoggedIn) {
    return <div>{children}</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {isLoggedIn && (
        <>
          {/* Mobile toggle button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed top-4 left-4 z-50 p-2 hover:bg-gray-200 rounded"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Sidebar overlay for mobile */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            />
          )}

          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 transition-transform duration-300 w-64 bg-white shadow-lg fixed lg:relative h-full z-40 flex flex-col`}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
            </div>
            <nav className="space-y-2 p-6 flex-1 overflow-y-auto">
              <Link
                href="/admin"
                className="block px-4 py-2 rounded hover:bg-gray-100 font-medium text-gray-700"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/brokers"
                className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
              >
                Manage Brokers
              </Link>
              <Link
                href="/admin/agents"
                className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
              >
                Manage Agents
              </Link>
              <Link
                href="/admin/series"
                className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
              >
                Manage Series
              </Link>
              <Link
                href="/admin/units"
                className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
              >
                Manage Units
              </Link>
              <Link
                href="/admin/lot-only"
                className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
              >
                Manage Lot-Only
              </Link>
            </nav>
            <div className="p-6">
              <Button onClick={handleLogout} variant="destructive" className="w-full">
                Logout
              </Button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}